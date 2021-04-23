use std::fs::{self};
use std::path::Path;

pub fn sassc(source_folder: &Path, scss_file: &str, target_folder: &Path) -> anyhow::Result<()> {
    let mut source_path = source_folder.to_path_buf();
    source_path.push(scss_file);

    if !source_path.exists() {
        return Ok(());
    }

    let sass_result = grass::from_path(
        source_path.to_str().expect("not utf-8?"),
        &grass::Options::default(),
    );
    let mut target_path = target_folder.to_path_buf();
    target_path.push(scss_file);
    target_path.set_extension("css");
    match sass_result {
        Ok(css) => fs::write(target_path, css)?,
        Err(_) => fs::write(target_path, "")?,
    }
    Ok(())
}
