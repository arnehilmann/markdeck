use std::error::Error;
use std::fs;

fn main() -> Result<(), Box<dyn Error>> {
    println!("compiling scss");
    let sass = grass::from_path(
        "src/markdeck/assets/markdeck/css/markdeck.revealjs.scss",
        &grass::Options::default())?;
    fs::write("src/markdeck/assets/markdeck/css/markdeck.revealjs.css", sass)?;
    Ok(())
}