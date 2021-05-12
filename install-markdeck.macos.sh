#!/bin/bash
set -eEu

install_pkg () {
    local pkg=$1
    brew upgrade $pkg || brew install $pkg
}

echo "# installing markdeck and its dependencies"

echo
echo "## markdeck v0.60.0 alpha"
curl -o markdeck -L "https://drive.google.com/uc?export=download&id=1qTsbzAn3JWrML_T9wiPCZtx8_3mntH52"
chmod a+rx ./markdeck

echo
echo "pandoc"
install_pkg pandoc

echo
echo "## pdf rendering via decktape"
install_pkg npm
npm install decktape
(
    cd node_modules/decktape/node_modules/puppeteer
    npm install
)

echo
echo "## render_ditaa, render_plantuml (optional)"
install_pkg java

echo
echo "## render_a2s, render_a2sketch (optional)"
docker run -d -p 22753:22753 arne/a2sketch:0.13 || :

echo
echo "optional: render_dot (optional)"
install_pkg graphviz || :

echo
echo "## render_qr (optional)"
install_pkg qrencode || :

echo
echo "## render_vegalite (optional)"
npm install -g vega vega-cli vega-lite || :
