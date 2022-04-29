#!/bin/bash
set -eEu

echo "markdeck | installing executable and dependencies"

for PKG in curl pandoc npm java graphviz qrencode svgbob; do
    echo "installing $PKG"
    brew upgrade $PKG || brew install $PKG
done

curl -o markdeck -L https://github.com/arnehilmann/markdeck/releases/download/v/markdeck.x86_64-apple-darwin && chmod a+rx ./markdeck

npm install decktape
( cd node_modules/decktape/node_modules/puppeteer; npm install; )

npm install vega vega-cli vega-lite
docker run -d -p 22753:22753 arne/a2sketch:0.13 || :

echo "done."