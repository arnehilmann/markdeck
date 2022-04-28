use std::env;
use std::fs;

fn main() -> std::io::Result<()> {
    let target = env::var("TARGET").unwrap();
    print!("building target {target}\n");

    let source = format!("src/docroot/pandoc-{target}");
    let target = "src/docroot/main/.tools/pandoc";

    print!("copying pandoc {source} to {target}\n");

    fs::copy(source, target)?;
    Ok(())
}