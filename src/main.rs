use std::fs::{self, OpenOptions};
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::mpsc::Sender;

use glob::glob;
use rust_embed::RustEmbed;
use rusync::{sync, Syncer};
use serde_json::{from_str, Map, Value};

use anyhow::Error;
use notify::{RecommendedWatcher, RecursiveMode, Watcher};
use std::sync::mpsc::channel;
use std::time::Duration;

use live_server::Trigger;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;

// TODO sanity check
// TODO check for following tools:
// TODO brew install pandoc
// TODO brew install qrencode
// TODO brew install java
// TODO brew install gradle
// TODO brew install curl
// TODO ... graphviz
// TODO ... vegalite
// TODO docker run -d -p 22753:22753 arne/a2sketch:0.15

mod live_server;

#[derive(RustEmbed)]
#[folder = "src/markdeck"]
struct Assets;

fn main() -> Result<(), Error> {
    let source_path = Path::new(".");
    let target_path: &'static Path = Path::new("argh");

    let sources = fetch_sources(&source_path);

    let running = Arc::new(AtomicBool::new(true));
    let running_watcher = running.clone();

    let (tx, rx) = channel();
    let tx2 = tx.clone();

    let live_server = std::thread::spawn(move || live_server::start_live_server(&target_path, rx));
    let watcher = std::thread::spawn(move || {
        watch(&source_path, &sources, &target_path, running_watcher, tx)
    });

    ctrlc::set_handler(move || {
        println!("\nctrl-c received");
        running.store(false, Ordering::Relaxed);
        tx2.send(Trigger::Shutdown).unwrap();
        println!("all stopped");
    })
    .expect("Error setting Ctrl-C handler");

    live_server.join().unwrap()?;
    watcher.join().unwrap()?;

    Ok(())
}

fn watch(
    source_path: &Path,
    sources: &[PathBuf],
    target_path: &Path,
    running: Arc<AtomicBool>,
    sender: Sender<Trigger>,
) -> Result<(), Error> {
    render(&source_path, &sources, &target_path)?;
    let (tx, rx) = channel();
    let mut watcher: RecommendedWatcher = Watcher::new(tx, Duration::from_secs(1))?;
    watcher.watch("assets/", RecursiveMode::Recursive)?;
    // TODO handle changing sources
    for s in sources {
        watcher.watch(s, RecursiveMode::NonRecursive)?;
    }
    while running.load(Ordering::Relaxed) {
        match rx.recv_timeout(Duration::from_millis(500)) {
            Ok(notify::DebouncedEvent::Write(_)) => {
                let content = Assets::get("assets/markdeck/css/when-rerendering.css")
                    .expect("cannot convert data to utf8");
                fs::write(
                    format!("{}/assets/css/rerendering.css", target_path.display()),
                    content.as_ref(),
                )?;
                sender.send(Trigger::RefreshCss)?;
                match render(&source_path, &sources, &target_path) {
                    Ok(_) => {
                        fs::write(
                            format!("{}/assets/css/rerendering.css", target_path.display()),
                            "",
                        )?;
                        sender.send(Trigger::Reload)?;
                    }
                    Err(e) => println!("{:?}", e),
                }
            }
            Ok(event) => println!("{:?}", event),
            Err(_) => {}
        }
    }
    println!("shutting down watcher");

    Ok(())
}

fn render(source_path: &Path, sources: &[PathBuf], target_path: &Path) -> Result<(), Error> {
    for source in sources.iter() {
        println!("sources: {}", source.display());
    }

    sync(&source_path, "assets", &target_path)?;
    sync(&source_path, "themes", &target_path)?;

    sync_static("assets", &target_path)?;
    sync_static(".markdeck", &target_path)?;
    sync_static("explain.html", &target_path)?;
    sync_static("template-", &target_path)?;

    let metadata = fetch_metadata(&target_path)?;
    println!(
        "variant: {}",
        metadata["variant"]
            .as_str()
            .expect("cannot access variant as str")
    );

    render_deck(&source_path, &sources, &target_path, &metadata)?;

    // devserver_lib::run(&"localhost", 8080, "", /*Auto-reload:*/ true ); // Runs forever serving the current folder on http://localhost:8080

    Ok(())
}

fn fetch_sources(source_path: &Path) -> Vec<PathBuf> {
    glob(&format!("{}/*[a-z]*.md", source_path.display()))
        .expect("Failed to read glob pattern")
        .map(|x| x.expect("mmh"))
        .collect::<Vec<PathBuf>>()
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

fn sassc(source_path: &Path, scss_file: &str, target_path: &Path) -> anyhow::Result<()> {
    let sass = grass::from_path(
        format!("{}/{}", source_path.display(), scss_file).as_ref(),
        &grass::Options::default(),
    );
    // TODO calc suffix: scss -> css
    if let Ok(sass) = sass {
        fs::write(format!("{}/{}", target_path.display(), scss_file), sass)?;
    }
    Ok(())
}

fn render_deck(
    source_path: &Path,
    source_files: &[PathBuf],
    target_path: &Path,
    metadata: &Map<String, Value>,
) -> Result<(), Error> {
    let mut slides_combined = PathBuf::from(target_path);
    slides_combined.push("slides.combined.md.txt");
    if slides_combined.exists() {
        fs::remove_file(&slides_combined)?;
    }
    let mut slides_combined = OpenOptions::new()
        .append(true)
        .create(true)
        .open(slides_combined)?;

    for source_file in source_files.iter() {
        let contents = fs::read(&source_file)?;
        slides_combined.write_all(&contents)?;
        slides_combined.write_all(b"\n\n")?;
    }
    let theme = metadata["themes"].as_str().unwrap();
    let sass = grass::from_path(
        format!("{}/themes/{}/css/slides.scss", source_path.display(), theme).as_ref(),
        &grass::Options::default(),
    );
    if let Ok(sass) = sass {
        fs::write(
            format!("{}/themes/{}/css/slides.css", target_path.display(), theme),
            sass,
        )?;
    }

    let mut render_cmd = Command::new("pandoc");
    render_cmd
        .current_dir(&target_path)
        .arg("-f")
        .arg("markdown+yaml_metadata_block")
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
        .arg(format!(
            "--template={}/{}/template-{}.html",
            std::env::current_dir()?.display(),
            target_path.display(),
            metadata["variant"]
                .as_str()
                .expect("cannot access variant in metadata")
        ))
        .arg(".markdeck/defaults.yaml")
        .arg("slides.combined.md.txt");
    println!("{:#?}", render_cmd);
    let output = render_cmd.output().expect("failed to run pandoc");
    println!("{}", output.status);

    // std::io::stdout().write_all(&output.stdout).unwrap();
    // std::io::stderr().write_all(&output.stderr).unwrap();

    Ok(())
}

fn fetch_metadata(target_path: &Path) -> Result<Map<String, Value>, Error> {
    // TODO sourcepath, sources
    let mut metadata_cmd = Command::new("pandoc");
    metadata_cmd.arg(format!(
        "--template={}/{}/.markdeck/metadata.template",
        std::env::current_dir()?.display(),
        &target_path.display()
    ));
    metadata_cmd.arg(format!(
        "{}/.markdeck/defaults.yaml",
        &target_path.display()
    ));
    metadata_cmd.arg("slides.md");
    let metadata = metadata_cmd.output().expect("failed to run pandoc");
    println!("raw: {:#?}", metadata);
    let metadata: Value = from_str(std::str::from_utf8(&metadata.stdout)?)?;
    println!("json: {:#?}", metadata);
    let metadata: Map<String, Value> = metadata
        .as_object()
        .expect("cannot convert metadata")
        .to_owned();
    println!("map: {:#?}", metadata);
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

fn sync(source_root: &Path, source_path: &str, target_root: &Path) -> Result<sync::Stats, Error> {
    let console_info = rusync::ConsoleProgressInfo::new();
    let options = rusync::SyncOptions::default();

    let mut source = source_root.to_path_buf();
    source.push(source_path);
    let mut target = target_root.to_path_buf();
    target.push(source_path);
    let syncer = Syncer::new(&source, &target, options, Box::new(console_info));
    Ok(syncer.sync()?)
}
