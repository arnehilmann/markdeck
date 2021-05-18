// !INCLUDECODE "mds/cli/dockerfile.sh" ({.bash .fragment .hl-code ln-start-from=15}), 15:18
// <pre class="bash fragment hl-code" data-ln-start-from="24"><code>
// !INCLUDE "mds/introduction.md"

use regex::Regex;
use std::fs;
use std::io::Result;

use log::{debug, warn};

pub fn preprocess(input: Vec<u8>) -> Result<Vec<u8>> {
    debug!("preprocessing");

    let includecode_re = Regex::new("!INCLUDECODE \"(.*)\" [(](.*)[)](.*)$").unwrap();
    let range_re = Regex::new(", *(\\d+)?:?(\\d+)?").unwrap();

    let mut content = input;
    let mut run = true;
    while run {
        run = false;
        let content_str = String::from_utf8(content).expect("not valid UTF-8");
        content = Vec::new();
        for line in content_str.lines() {
            if line.starts_with("!INCLUDE ") {
                let filename = line.replace("!INCLUDE ", "");
                let filename = filename.trim().trim_matches('"');
                let mut included_content = fs::read(filename)?;
                content.append(&mut included_content);
                run = true;
            } else if line.starts_with("!INCLUDECODE ") {
                // !INCLUDECODE "markdeck" ({.bash .fragment .hl-code ln-start-from=15}), 1:3
                // ```{.bash .hl-code ln-start-from=23}
                let caps = includecode_re.captures(line).unwrap();
                content.extend(b"\n```");
                content.extend(caps.get(2).map_or("", |m| m.as_str()).as_bytes());
                content.push(b'\n');
                let filename = caps.get(1).unwrap().as_str();
                // TODO include selected lines only
                // TODO add optional highlight lines and/or fragmentsc
                // TODO handle open ranges better, like :10 or 2:
                let line_range = caps.get(3).map_or("", |m| m.as_str());
                debug!("line range: {:#?}", line_range);
                let mut start = "1";
                let mut end = "9999";
                if line_range != "" {
                    match range_re.captures(line_range) {
                        Some(range_caps) => {
                            start = range_caps.get(1).map_or("1", |m| m.as_str());
                            end = range_caps.get(2).map_or(start, |m| m.as_str());
                        }
                        None => warn!("{} not a valid line_range", line_range),
                    };
                }

                let start = start.parse::<usize>().unwrap() - 1;
                debug!("start: {}", start);

                let end = end.parse::<usize>().unwrap() - 1;
                debug!("end: {}", end);

                let included_content = fs::read(filename)?;
                for (nr, line) in std::str::from_utf8(&included_content)
                    .unwrap_or("__INVALID CHARACTER__")
                    .lines()
                    .enumerate()
                {
                    if nr >= start && nr <= end {
                        content.extend_from_slice(line.as_bytes());
                        content.push(b'\n');
                    }
                }
                content.extend(b"```\n");
            } else {
                content.extend_from_slice(line.as_bytes());
            }
            content.push(b'\n');
        }
    }
    Ok(content)
}