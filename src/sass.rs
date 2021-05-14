use std::fs::{self};
use std::path::Path;
use log::{info, warn};

pub fn sassc(source_folder: &Path, scss_file: &str, target_folder: &Path) -> anyhow::Result<()> {
    let mut source_path = source_folder.to_path_buf();
    source_path.push(scss_file);

    if !source_path.exists() {
        info!("scss not found at {}", source_path.display());
        return Ok(());
    }

    let sass_result = grass::from_path(
        source_path.to_str().expect("not utf-8?"),
        &grass::Options::default(),
    );
    let mut target_path = target_folder.to_path_buf();
    target_path.push(scss_file);
    target_path.set_extension("css");
    info!("compiling {} -> {}", source_path.display(), target_path.display());
    match sass_result {
        Ok(css) => fs::write(target_path, css)?,
        Err(msg) => {
            warn!("cannot compile scss: {}", msg);
            fs::write(target_path, "")?;
        },
    }
    Ok(())
}
