use std::env;
use std::fs;

fn main() -> std::io::Result<()> {
    let target = env::var("TARGET").unwrap();
    print!("building target {target}\n");

    let source = format!("src/docroot/pandoc-{target}");
    let target = "src/docroot/main/.tools/pandoc";

    print!("creating target folder\n");
    fs::create_dir_all("src/docroot/main/.tools/")?;

    print!("copying pandoc {source} to {target}\n");
    fs::copy(source, target)?;
    Ok(())
}