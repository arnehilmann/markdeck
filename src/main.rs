#[macro_use]
extern crate clap;

use std::fs::{self, OpenOptions};
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::channel;
use std::sync::mpsc::Sender;
use std::sync::Arc;
use std::time::{Duration, Instant};
use std::env;

use log::{debug, info, warn, error};
use glob::glob;
use rust_embed::RustEmbed;
use rusync::{sync, Syncer};
use serde_json::{from_str, Map, Value};
use anyhow::Error;
use notify::{RecommendedWatcher, RecursiveMode, Watcher};

use live_server::Trigger;

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
mod sass;
mod markdown_pp;

#[derive(RustEmbed)]
#[folder = "src/docroot/main"]
struct Assets;

fn print_versions() {
    let result = Command::new("pandoc")
        .arg("--version")
        .output()
        .expect("failed to run command");
    match result.status.code() {
        Some(code) => {
            if code != 0 {
                warn!("exited with status code: {}", code)
            }
        }
        None => warn!("Process terminated by signal"),
    }
    if let Some(version) = String::from_utf8_lossy(&result.stdout).lines().next() {
        info!("pandoc: {}", version);
    } else {
        warn!("pandoc: cannot retrieve version! Is it installed?")
    }
}

arg_enum! {
    #[derive(Debug)]
    enum WatcherType {
        Recommended,
        CompareReference,
    }
}

#[derive(Debug)]
struct PdfParams {
    filename: String,
    size: String,
    pause: String
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

fn main() -> Result<(), Error> {
    let matches = clap_app!(markdeck =>
        (version: "0.60.0")
        (author: "Arne Hilmann <arne.hilmann@gmail.com>")
        (about: "markdeck - collaborative slide editing made easy")
        (@arg port: --port +takes_value default_value("8080") "port of web server")
        (@arg source: --source +takes_value default_value(".") "path of source folder")
        (@arg target: --target +takes_value default_value("deck") "path of target folder")
        (@arg watcher: --watcher +takes_value +case_insensitive possible_values(&WatcherType::variants()) "watcher, detects source file changes")
        (@arg watch_delay: --watch_delay +takes_value default_value("500") "delay between watch calls, in millis")
        (@subcommand start =>
            (about: "starts specific components")
        )
        (@subcommand dev =>
            (about: "develop some features")
            
        )
    )
    .get_matches();

    match env::var("RUST_LOG") {
        Ok(_) => {},
        Err(_) => default_log_settings()
    }
    env_logger::init();

    print_versions();

    // let source_path = Path::new(".");
    let source_path = matches.value_of("source").unwrap(); // TODO unwrap
    let source_path = PathBuf::from(source_path);
    let target_path = matches.value_of("target").unwrap(); // TODO unwrap
    let target_path = PathBuf::from(target_path);
    let port: u32 = matches.value_of("port").unwrap().parse::<u32>().unwrap(); // TODO unwrap
    let watcher_type =
        value_t!(matches.value_of("watcher"), WatcherType).unwrap_or(WatcherType::CompareReference);
    let watch_delay = value_t_or_exit!(matches.value_of("watch_delay"), u64);

    let sources = fetch_sources(&source_path);

    if let Some(_matches) = matches.subcommand_matches("dev") {
        markdown_pp::preprocess_file(PathBuf::from("slides.md"))?;
        std::process::exit(0);
    }

    // render(&source_path, &sources, &target_path)?;

    let running = Arc::new(AtomicBool::new(true));
    let running_watcher = running.clone();

    let (tx, rx) = channel();
    let tx2 = tx.clone();

    let target_path_for_live_server = target_path.clone();
    let live_server = std::thread::spawn(move || {
        live_server::start_live_server(target_path_for_live_server, port, rx)
    });
    let watcher = std::thread::spawn(move || match watcher_type {
        WatcherType::CompareReference => compare_watch(
            &source_path,
            &sources,
            &target_path,
            "index.html",
            watch_delay,
            running_watcher,
            tx,
        ),
        WatcherType::Recommended => watch(
            &source_path,
            &sources,
            &target_path,
            watch_delay,
            running_watcher,
            tx,
        ),
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

fn compare_watch(
    source_path: &PathBuf,
    sources: &[PathBuf],
    target_path: &Path,
    target_file: &str,
    watch_delay: u64,
    running: Arc<AtomicBool>,
    sender: Sender<Trigger>,
) -> Result<(), Error> {
    info!("starting watcher");

    let mut reference = PathBuf::from(target_path);
    reference.push(target_file);

    let mut files_count;
    let mut last_files_count = 0;
    let mut rerender;

    while running.load(Ordering::Relaxed) {
        let mut r_m = std::time::SystemTime::UNIX_EPOCH;
        match reference.metadata() {
            Ok(metadata) => r_m = metadata.modified()?,
            _ => {}
        }
        rerender = false;
        files_count = 0;

        for s in interesting_files(&source_path) {
            files_count += 1;
            let s_m = s.metadata()?.modified()?;
            if s_m > r_m {
                info!("change detected in {}, rerendering!", s.display());
                rerender = true;
            }
        }
        if files_count != last_files_count {
            info!("number of source files changed (from {} to {}), rerendering!", last_files_count, files_count);
            rerender = true;
        }
        if rerender {
            sender.send(Trigger::StartRerendering)?;
            match render(&source_path, &sources, &target_path) {
                Ok(Some(pdf_options)) => {
                    sender.send(Trigger::Reload)?;
                    info!("rendering pdf now!");
                    let start = Instant::now();
                    let mut target_pdf = PathBuf::from(target_path);
                    target_pdf.push(pdf_options.filename);
                    let mut render_cmd = Command::new("node_modules/.bin/decktape");    // TODO make decktape binary configurable
                    render_cmd
                        .arg("-s")
                        .arg(pdf_options.size)
                        .arg("-p")
                        .arg(pdf_options.pause)
                        .arg("reveal")
                        .arg("http://localhost:8080/index.html?render=pdf") // TODO port hardwired here
                        .arg(&target_pdf);
                    let mut child = render_cmd.spawn().unwrap();
                    match child.wait() {
                        Ok(status) => {
                            if status.success() {
                                info!("pdf rendered succesfully");
                            } else {
                                warn!("an error occured during pdf rendering!");
                            }
                        },
                        Err(e) => error!("an error occured during pdf rendering: {}", e),
                    }
                    let duration = start.elapsed();
                    info!("pdf rendering took {} msecs", duration.as_millis());
                },
                Ok(None) => sender.send(Trigger::Reload)?,
                Err(e) => {
                    warn!("{:?}", e);
                    std::fs::OpenOptions::new().create(true).append(true).open(&reference)?;
                },
            }
        }

        last_files_count = files_count;
        std::thread::sleep(Duration::from_millis(watch_delay));
    }

    info!("shutting down watcher");
    Ok(())
}

fn watch(
    source_path: &PathBuf,
    sources: &[PathBuf],
    target_path: &Path,
    watch_delay: u64,
    running: Arc<AtomicBool>,
    sender: Sender<Trigger>,
) -> Result<(), Error> {
    info!("starting watcher");
    let (tx, rx) = channel();
    let mut watcher: RecommendedWatcher = Watcher::new(tx, Duration::from_millis(watch_delay))?;
    watcher.watch("assets/", RecursiveMode::Recursive)?;    // TODO regard source_path
    // TODO handle changing sources
    for s in sources {
        watcher.watch(s, RecursiveMode::NonRecursive)?;
    }
    while running.load(Ordering::Relaxed) {
        match rx.recv_timeout(Duration::from_millis(500)) {
            Ok(notify::DebouncedEvent::Write(_)) => {
                sender.send(Trigger::StartRerendering)?;
                match render(&source_path, &sources, &target_path) {
                    Ok(_) => {
                        sender.send(Trigger::Reload)?;
                    }
                    Err(e) => warn!("{:?}", e),
                }
            }
            Ok(event) => info!("{:?}", event),
            Err(_) => {}
        }
    }
    info!("shutting down watcher");

    Ok(())
}

fn render(source_path: &PathBuf, sources: &[PathBuf], target_path: &Path) -> Result<Option<PdfParams>, Error> {
    let start = Instant::now();
    for source in sources.iter() {
        info!("sources: {}", source.display());
    }

    sync(&source_path, "assets", &target_path)?;
    sync(&source_path, "themes", &target_path)?;

    sync_static("assets", &target_path)?;
    sync_static(".markdeck", &target_path)?;
    sync_static("explain.html", &target_path)?;
    // sync_static("template-", &target_path)?;

    let pdf_params = render_deck(&source_path, &sources, &target_path)?;

    let duration = start.elapsed();
    info!("rendering took {} msecs", duration.as_millis());

    Ok(pdf_params)
}

fn interesting_files(source_path: &PathBuf) -> Vec<PathBuf> {
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

fn render_deck(
    source_path: &Path,
    source_files: &[PathBuf],
    target_path: &Path,
) -> Result<Option<PdfParams>, Error> {
    info!("render_deck");
    let mut slides_combined = PathBuf::from(target_path);
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

    let metadata = fetch_metadata(&target_path)?;
    info!(
        "variant: {}",
        metadata["variant"]
            .as_str()
            .expect("cannot access variant as str")
    );
    info!("pdf: {:#?}", metadata["pdf"]);
    let variant = metadata["variant"].as_str().unwrap_or("");
    let toc = metadata["table_of_contents"].as_bool().unwrap_or(false);
    let themes = metadata["themes"].as_str().unwrap_or("");

    info!("compiling scss -> css");
    sass::sassc(
        target_path,
        &format!("assets/markdeck/css/markdeck.{}.scss", variant),  // TODO should be called on build time
        target_path,
    )?;
    sass::sassc(source_path, "assets/css/slides.scss", target_path)?;
    sass::sassc(
        source_path,
        &format!("assets/css/slides.{}.scss", variant),
        target_path,
    )?;
    for theme in themes.split(&[' ', ','][..]) {
        sass::sassc(
            source_path,
            &format!("themes/{}/css/slides.scss", theme),
            target_path,
        )?;
        sass::sassc(
            source_path,
            &format!("themes/{}/css/slides.{}.scss", theme, variant),
            target_path,
        )?;
    }

    info!("rendering slides now");

    let mut template_path = std::env::current_dir()?;
    template_path.push(target_path);
    template_path.push(".markdeck");
    template_path.push(format!("template-{}.html", variant));

    let mut render_cmd = Command::new("pandoc");
    render_cmd
        .current_dir(&target_path)
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
    if Path::new(&shortcut_filter).exists() {
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

        let pdf = metadata["pdf"].as_str().unwrap_or("");
        // if metadata.get("pdf").is_some() {
        // if metadata["pdf"] != Value::Null {
        if pdf != "" {
            info!("pdf should be rendered to {}", pdf);
            return Ok(Some(PdfParams{filename: pdf.to_string(),
                                     size: metadata["pdf_size"].as_str().unwrap_or("1024x768").to_string(),
                                     pause: metadata.get("pdf_pause").map_or("100", |v| v.as_str().unwrap_or("100")).to_string()}));
        }
        return Ok(None)
    } else {
        for line in String::from_utf8(output.stdout)?.lines() {
            info!("{}", line);
        }
        for line in String::from_utf8(output.stderr)?.lines() {
            warn!("{}", line);
        }
        warn!("an error occured! {:?}", output.status.code());
        return Ok(None)
    }
}

fn fetch_metadata(target_path: &Path) -> Result<Map<String, Value>, Error> {
    info!("fetch_metadata");

    let mut metadata_cmd = Command::new("pandoc");
    metadata_cmd
        .current_dir(&target_path)
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

fn sync_static(source_path: &str, target_root: &Path) -> Result<(), Error> {
    for file in Assets::iter() {
        if !file.starts_with(&source_path) {
            continue;
        }
        let mut target = target_root.to_path_buf();
        target.push(&*file);

        #[cfg(not(debug_assertions))]
        if target.exists() {
            continue;
        }

        let content = Assets::get(&file).expect("cannot convert data to utf8");
        // println!("syncing {} to {:#?}", file, &target);
        fs::create_dir_all(&target.parent().expect("cannot access parent folder"))?;
        fs::write(&target, content.as_ref())?;
        // }
    }

    Ok(())
}

fn sync(
    source_root: &PathBuf,
    source_path: &str,
    target_root: &Path,
) -> Result<sync::Stats, Error> {
    let console_info = rusync::ConsoleProgressInfo::new();
    let options = rusync::SyncOptions::default();

    let mut source = source_root.to_path_buf();
    source.push(source_path);
    let mut target = target_root.to_path_buf();
    target.push(source_path);
    let syncer = Syncer::new(&source, &target, options, Box::new(console_info));
    Ok(syncer.sync()?)
}
