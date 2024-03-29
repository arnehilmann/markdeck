#[macro_use]
extern crate clap;
extern crate color_eyre;
extern crate eyre;

use std::env;
use std::fs::{self, OpenOptions, File};
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::io::LineWriter;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::channel;
use std::sync::mpsc::Sender;
use std::sync::Arc;
use std::time::{Duration, Instant};
#[cfg(target_family = "unix")]
use std::os::unix::fs::PermissionsExt;  // TODO what about windows?


use clap::crate_version;
use clap::{clap_app, ArgMatches};
use color_eyre::{
    eyre::{eyre, Result},
    Report,
};
// use log::{debug, info, warn, error};
use glob::glob;
use rust_embed::RustEmbed;
use rusync::{sync, Syncer};
use serde_json::{from_str, Map, Value};
// use anyhow::{bail, Error};

use live_server::Trigger;

use tracing::{debug, info, warn};
use tracing_subscriber::EnvFilter;

// TODO brew install java graphviz qrencode svgbob


// old stuff below this line, try to ignore for now
// TODO sanity check
// TODO check for following tools:
// TODO brew install pandoc # mandatory

// TODO npm install decktape; cd node_modules/decktape/node_modules/puppeteer; npm install; cd -;  # for pdf rendering
// TODO $(npm bin)/decktape -s 1024x768 reveal "http://localhost:8080/index.html" aha.pdf

// TODO brew install java   # for render_ditaa render_plantuml
// TODO brew install graphviz   # for render_dot
// TODO brew install qrencode   # for render_qr

// TODO brew install npm
// TODO npm install -g vega vega-cli vega-lite  # for render_vegalite
// TODO docker run -d -p 22753:22753 arne/a2sketch:0.15 # for render_a2s render_a2sketchc:walkdir

// TODO install rust via https://rustup.rs/
// TODO cargo install svgbob_cli    # for render_svgbob

// diskutil erasevolume HFS+ 'markdeck' `hdiutil attach -nomount ram://10000000`
// cd /Volume/markdeck
// rsync -Pav ~/dev/markdeck/src ~/dev/markdeck/Cargo.* ~/dev/markdeck/build.rs . && cargo build --release

// TODO fix svgbob rendering: at random id to svg element, prepend that id to every style decl

// TODO fix explain.html

mod live_server;
mod markdown_pp;
mod sass;

#[derive(RustEmbed)]
#[folder = "src/docroot/main"]
struct Assets;

arg_enum! {
    #[derive(Debug,Clone)]
    enum WatcherType {
        Recommended,
        CompareReference,
    }
}

#[cfg(debug_assertions)]
fn default_log_settings() {
    env::set_var(
        "RUST_LOG",
        "actix_server=info,actix_web=warn,live_server=debug,markdeck=debug",
    )
}

#[cfg(not(debug_assertions))]
fn default_log_settings() {
    env::set_var(
        "RUST_LOG",
        "actix_server=info,actix_web=warn,live_server=info,markdeck=info",
    )
}

#[derive(Debug, Clone)]
#[allow(dead_code)]
struct Context {
    source_path: PathBuf,
    target_path: PathBuf,
    target_file: String,
    port: u32,
    watcher_type: WatcherType,
    watch_delay: u64,
    pandoc_cmd: String,
    // pandoc_available: bool,
}

impl From<ArgMatches<'_>> for Context {
    fn from(matches: ArgMatches) -> Self {
        let pandoc_cmd = matches.value_of("pandoc_cmd").unwrap_or("").to_string();
        Context {
            source_path: PathBuf::from(matches.value_of("source").unwrap()),
            target_path: PathBuf::from(matches.value_of("target").unwrap()),
            target_file: String::from("index.html"),
            port: matches.value_of("port").unwrap().parse::<u32>().unwrap(), // TODO unwrap
            watcher_type: value_t!(matches.value_of("watcher"), WatcherType)
                .unwrap_or(WatcherType::CompareReference),
            watch_delay: value_t_or_exit!(matches.value_of("watch_delay"), u64),
            pandoc_cmd,
        }
    }
}

fn setup() -> Result<(), Report> {
    if std::env::var("RUST_LIB_BACKTRACE").is_err() {
        std::env::set_var("RUST_LIB_BACKTRACE", "1")
    }
    color_eyre::install()?;

    if std::env::var("RUST_LOG").is_err() {
        default_log_settings();
    }
    tracing_subscriber::fmt::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    Ok(())
}

const ABOUT: &str = "markdeck - collaborative slide editing made easy";

fn main() -> Result<(), Report> {
    setup()?;

    let matches = clap_app!(markdeck =>
        (version: crate_version!())
        (author: "Arne Hilmann <arne.hilmann@gmail.com>")
        (about: ABOUT)
        (@arg port: --port +takes_value default_value("8080") "port of web server")
        (@arg source: --source +takes_value default_value(".") "path of source folder")
        (@arg target: --target +takes_value default_value("deck") "path of target folder")
        (@arg watcher: --watcher +takes_value +case_insensitive possible_values(&WatcherType::variants()) "watcher, detects source file changes")
        (@arg watch_delay: --watch_delay +takes_value default_value("500") "delay between watch calls, in millis")
        (@arg pandoc_cmd: --pandoc_cmd +takes_value default_value(".tools/pandoc") "pandoc command")
        (@subcommand init =>
            (about: "initializes current folder with minimal markdeck sources")
            (@arg folder: +required +takes_value "name of new markdeck folder")
        )
        (@subcommand dev =>
            (about: "dev stuff")
        )
    )
    .get_matches();

    if let Some(_) = matches.subcommand_matches("dev") {
        info!("dev");
        let path =
            "../example/deck/rendered/render_svgbob-1a89ca30702be95a205cda7d628bb3e5699bdee9.svg";

        use minidom::quick_xml::Reader;
        use minidom::Element;

        let mut reader = Reader::from_file(path)?;
        let mut svg = Element::from_reader(&mut reader)?;
        let id = "4711-0815";
        svg.set_attr("id", id);

        let mut file = File::create("foo.txt")?;
        svg.write_to(&mut file)?;
        // info!("{:#?}", svg);
        return Ok(());
    }

    if let Some(init_matches) = matches.subcommand_matches("init") {
        let folder = init_matches.value_of("folder").unwrap();
        info!("folder: {}", folder);
        let mut path = env::current_dir()?;
        path.push(folder);
        /*  allow "init" in existing folder, just dont overwrite anything
        if fs::metadata(&path).is_ok() {
            return Err(eyre!(
                "folder '{}' already exists, bailing out now...",
                path.display()
            ));
        }
        */
        fs::create_dir_all(&path)?;
        sync_static("scaffold/", &path, "")?;
        info!(
            "change to new folder '{}', then run 'markdeck' again...",
            folder
        );
        return Ok(());
    }

    info!("{}", ABOUT);

    let context = Context::from(matches);
    debug!("{:#?}", context);

    let running = Arc::new(AtomicBool::new(true));
    let running_watcher = running.clone();

    let (tx, rx) = channel();
    let tx2 = tx.clone();

    let live_server_context = context.clone();
    let live_server = std::thread::spawn(move || {
        live_server::start_live_server(
            live_server_context.target_path,
            live_server_context.port,
            rx,
        )
    });
    let watcher = std::thread::spawn(move || match context.watcher_type {
        WatcherType::CompareReference => context.compare_watch(running_watcher, tx),
        WatcherType::Recommended => todo!("RecommendedWatcher not supported yet!"),
    });

    ctrlc::set_handler(move || {
        info!("\nctrl-c received");
        running.store(false, Ordering::Relaxed);
        tx2.send(Trigger::Shutdown).unwrap(); // TODO unwrap
        info!("stopping all threads");
    })
    .expect("Error setting Ctrl-C handler");

    live_server.join().unwrap()?; // TODO unwrap
    watcher.join().unwrap()?; // TODO unwrap

    Ok(())
}

impl Context {
    fn compare_watch(
        &self,
        running: Arc<AtomicBool>,
        sender: Sender<Trigger>,
    ) -> Result<(), Report> {
        info!("starting watcher");

        let mut reference = PathBuf::from(&self.target_path);
        reference.push(&self.target_file);

        sync_executables(".tools", &self.target_path, ".tools")?;
        // TODO fix exec permission

        let mut files_count;
        let mut last_files_count = 0;
        let mut rerender;

        while running.load(Ordering::Relaxed) {
            let sources = fetch_sources(&self.source_path);
            let mut r_m = std::time::SystemTime::UNIX_EPOCH;
            if let Ok(metadata) = reference.metadata() {
                r_m = metadata.modified()?
            }
            rerender = false;
            files_count = 0;

            for s in interesting_files(&self.source_path) {
                files_count += 1;
                let s_m = s.metadata()?.modified()?;
                if s_m > r_m {
                    info!("change detected in {}, rerendering!", s.display());
                    rerender = true;
                }
            }
            if files_count != last_files_count {
                info!(
                    "number of source files changed (from {} to {}), rerendering!",
                    last_files_count, files_count
                );
                rerender = true;
            }
            if rerender {
                sender.send(Trigger::StartRerendering)?;
                match self.render_html(&sources) {
                    Ok(_) => sender.send(Trigger::Reload)?,
                    Err(e) => {
                        warn!("an error occured during html rendering: {:?}", e);
                        std::fs::OpenOptions::new()
                            .create(true)
                            .append(true)
                            .open(&reference)?;
                    }
                }
            }

            last_files_count = files_count;
            std::thread::sleep(Duration::from_millis(self.watch_delay));
        }

        info!("shutting down watcher");
        Ok(())
    }

    fn render_html(&self, sources: &[PathBuf]) -> Result<(), Report> {
        let start = Instant::now();
        for source in sources.iter() {
            info!("sources: {}", source.display());
        }

        sync(&self.source_path, "assets", &self.target_path)?;
        sync(&self.source_path, "themes", &self.target_path)?;

        sync_static("assets", &self.target_path, "assets")?;
        sync_static(".markdeck", &self.target_path, ".markdeck")?;
        sync_static("toplevel", &self.target_path, "")?;

        // TODO dont bubble-up error, but display it here and in index.html
        self.render_deck(sources)?;

        let duration = start.elapsed();
        info!("rendering took {} msecs", duration.as_millis());

        Ok(())
    }
}

fn interesting_files(source_path: &Path) -> Vec<PathBuf> {
    glob(&format!("{}/*[a-z]*.md", source_path.display()))
        .expect("Failed to read md glob pattern")
        .chain(
            glob(&format!("{}/assets/**/*", source_path.display()))
                .expect("Failed to read assets glob pattern"),
        )
        .filter_map(|f| f.ok())
        .collect()
}

fn fetch_sources(source_path: &Path) -> Vec<PathBuf> {
    glob(&format!("{}/*[a-z]*.md", source_path.display()))
        .expect("Failed to read md glob pattern")
        .filter_map(|f| f.ok())
        .collect()
}

/*
if pandoc \
          -f markdown+yaml_metadata_block \
          -t html \
        ${table_of_contents:+ --toc} \
          --no-highlight \
          --wrap=preserve \
          --standalone \
          ${template:+ --template=$template} \
          --section-divs \
    --filter mathjax-pandoc-filter \
        $([[ -e $SHORTCUT_FILTER ]] && echo --lua-filter $SHORTCUT_FILTER) \
          --lua-filter /markdeck/lib/skip-slide-filter.lua \
          --lua-filter /markdeck/lib/render-asciiart-filter.lua \
          --lua-filter /markdeck/lib/render-emojis-filter.lua \
          --lua-filter /markdeck/lib/bg-shortcut-filter.lua \
          --lua-filter /markdeck/lib/inline-svg.lua \
          --lua-filter /markdeck/lib/icons.lua \
    $PANDOC_ARGS \
          -o /target/index.html.tmp \
          /markdeck/defaults.yaml /target/slides.combined.md.txt 2>&1 | tee /tmp/pandoc.output;
    */

impl Context {
    fn render_deck(&self, source_files: &[PathBuf]) -> Result<(), Report> {
        info!("render_deck");
        let mut slides_combined = PathBuf::from(&self.target_path);
        slides_combined.push("slides.combined.md.txt");
        if slides_combined.exists() {
            fs::remove_file(&slides_combined)?;
        }
        info!("combining source files");
        let mut slides_combined = OpenOptions::new()
            .append(true)
            .create(true)
            .open(slides_combined)?;

        for source_file in source_files.iter() {
            info!("source file: {}", source_file.display());
            let contents = fs::read(&source_file)?;
            let contents = markdown_pp::preprocess(contents)?;
            slides_combined.write_all(&contents)?;
            slides_combined.write_all(b"\n\n")?;
        }

        let metadata = self.fetch_metadata()?;
        let variant = metadata["variant"].as_str().unwrap_or("");
        info!("variant: {}", variant);
        let toc = metadata["table_of_contents"].as_bool().unwrap_or(false);
        let themes = metadata["themes"].as_str().unwrap_or("");

        info!("compiling scss -> css");
        sass::sassc(
            &self.target_path,
            &format!("assets/markdeck/css/markdeck.{}.scss", variant), // TODO should be called on build time
            &self.target_path,
        )?;
        sass::sassc(
            &self.source_path,
            "assets/css/slides.scss",
            &self.target_path,
        )?;
        sass::sassc(
            &self.source_path,
            &format!("assets/css/slides.{}.scss", variant),
            &self.target_path,
        )?;
        for theme in themes.split(&[' ', ','][..]) {
            sass::sassc(
                &self.source_path,
                &format!("themes/{}/css/slides.scss", theme),
                &self.target_path,
            )?;
            sass::sassc(
                &self.source_path,
                &format!("themes/{}/css/slides.{}.scss", theme, variant),
                &self.target_path,
            )?;
        }

        info!("rendering slides now");

        let mut template_path = std::env::current_dir()?;
        template_path.push(&self.target_path);
        template_path.push(".markdeck");
        template_path.push(format!("template-{}.html", variant));

        let mut render_cmd = Command::new(&self.pandoc_cmd);
        render_cmd
            .current_dir(&self.target_path)
            .arg("-f")
            .arg("markdown+yaml_metadata_block+tex_math_dollars")
            .arg("-t")
            .arg("html")
            .arg("--standalone")
            .arg("--section-divs")
            .arg("--no-highlight")
            .arg("--wrap=preserve")
            .arg("-o")
            .arg("index.html")
            .arg("--lua-filter")
            .arg(".markdeck/skip-slide-filter.lua")
            .arg("--lua-filter")
            .arg(".markdeck/render-asciiart-filter.lua")
            .arg("--lua-filter")
            .arg(".markdeck/render-emojis-filter.lua")
            .arg("--lua-filter")
            .arg(".markdeck/bg-shortcut-filter.lua")
            .arg("--lua-filter")
            .arg(".markdeck/inline-svg.lua")
            .arg("--lua-filter")
            .arg(".markdeck/icons.lua")
            .arg("--mathjax")
            .arg(format!("--template={}", template_path.display()));

        let shortcut_filter = format!(".markdeck/{}-shortcut-filter.lua", variant);
        if Path::new(&format!(
            "{}/{}",
            &self.target_path.display(),
            &shortcut_filter
        ))
        .exists()
        {
            render_cmd.arg("--lua-filter").arg(shortcut_filter);
        }

        if toc {
            render_cmd.arg("--toc");
        }

        render_cmd
            .arg(".markdeck/defaults.yaml")
            .arg("slides.combined.md.txt");
        debug!("render cmd: {:#?}", render_cmd);
        let output = render_cmd.output().expect("failed to run pandoc");
        if output.status.success() {
            for line in String::from_utf8(output.stdout)?.lines() {
                debug!("{}", line);
            }
            for line in String::from_utf8(output.stderr)?.lines() {
                debug!("{}", line);
            }
            info!("slides rendered successfully");
        } else {
            // TODO write output to index.html
            let file = File::create("index.html")?;
            let mut file = LineWriter::new(file);
            file.write_all(b"<html><body>\n")?;
            file.write_all(&output.stdout)?;
            file.write_all(&output.stderr)?;
            for line in String::from_utf8(output.stdout)?.lines() {
                info!("{}", line);
            }
            for line in String::from_utf8(output.stderr)?.lines() {
                warn!("{}", line);
            }
            file.flush()?;
            warn!("an error occured! {:?}", output.status.code());
        }
        Ok(())
    }

    fn fetch_metadata(&self) -> Result<Map<String, Value>, Report> {
        info!("fetch_metadata");

        let mut metadata_cmd = Command::new(&self.pandoc_cmd);
        metadata_cmd
            .current_dir(&self.target_path)
            .arg("--template=.markdeck/metadata.template")
            .arg(".markdeck/defaults.yaml")
            .arg("slides.combined.md.txt");
        debug!("metadata cmd: {:#?}", metadata_cmd);
        let metadata = metadata_cmd.output().expect("failed to run pandoc");
        let metadata: Value = from_str(std::str::from_utf8(&metadata.stdout)?)?;
        let metadata: Map<String, Value> = metadata
            .as_object()
            .expect("cannot convert metadata")
            .to_owned();
        for pair in metadata.iter() {
            debug!("metadata: {} -> {}", pair.0, pair.1);
        }
        Ok(metadata)
    }
}

fn sync_executables(source_path: &str, target_root: &Path, target_path: &str) -> Result<(), Report> {
    sync_static(&source_path, &target_root, &target_path)?;
    #[cfg(target_family = "unix")]  // TODO support windows, too!
    {
        let mut target = target_root.to_path_buf();
        if !target_path.is_empty() {
            target.push(target_path);
        }
        let entries = fs::read_dir(&target).unwrap();
        for entry in entries {
            let path = entry?.path();
            info!("ensure executable bit set for {}", &path.display());
            let mut perms = fs::metadata(&path)?.permissions();
            perms.set_mode(0o755);
            fs::set_permissions(&path, perms)?;
        }
    }
    Ok(())
}

fn sync_static(source_path: &str, target_root: &Path, target_path: &str) -> Result<(), Report> {
    for file in Assets::iter() {
        if !file.starts_with(&source_path) {
            continue;
        }
        let mut target = target_root.to_path_buf();
        if !target_path.is_empty() {
            target.push(target_path);
        }
        let short_file = file
            .strip_prefix(source_path)
            .unwrap()
            .trim_start_matches('/');
        target.push(&*short_file);

        #[cfg(not(debug_assertions))]
        if target.exists() {
            continue;
        }

        let content = Assets::get(&file).expect("cannot convert data to utf8");
        fs::create_dir_all(&target.parent().expect("cannot access parent folder"))?;
        fs::write(&target, content.data)?;
    }

    Ok(())
}

fn sync(source_root: &Path, source_path: &str, target_root: &Path) -> Result<sync::Stats> {
    let console_info = rusync::ConsoleProgressInfo::new();
    let options = rusync::SyncOptions::default();

    let mut source = source_root.to_path_buf();
    source.push(source_path);
    let mut target = target_root.to_path_buf();
    target.push(source_path);
    let syncer = Syncer::new(&source, &target, options, Box::new(console_info));
    syncer.sync().map_err(|err| -> Report { eyre!(err) })
}
