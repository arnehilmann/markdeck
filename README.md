# markdeck - presentations as code

author cool slide decks, text-only, offline-ready, collaborative

![](https://img.shields.io/github/forks/arnehilmann/markdeck.svg)
![](https://img.shields.io/github/stars/arnehilmann/markdeck.svg)
![](https://img.shields.io/github/issues/arnehilmann/markdeck.svg)
![](https://img.shields.io/github/license/arnehilmann/markdeck.svg)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/ArneHilmann)
<!--
https://img.shields.io/twitter/url/https/github.com/arnehilmann/markdeck.svg?style=social
-->

## why?

* converts markdown to a clean html5 slide deck
* cool looking: based on battle-proven web frameworks, like reveal.js
* no uplink required, neither when authoring, nor presenting:</br>
    no awkward moments during presentation (no "I am still waiting for the Internet, sorry!")
* all batteries included: live renderer, pdf output, asciiart-converter
* text-only, easy syntax: just markdown
* fast-n-easy to write: bring your own editor!
* easy to collaborate-n-reuse: text-only, so bring your own VCS
* eye-candy: supports unicode, emojis, fontawesome, asciiart, math, charts, code highlighting,
    recorded terminal sessions, ...
* self-documenting [documentation slides](DOCUMENTATION.md#self-documenting-documentation-slides):</br>
    see the slide source and the result, side-by-side

You can also visit the shiny [landing page](https://arnehilmann.github.io/markdeck/), the
[revealjs showcase](https://arnehilmann.github.io/markdeck/showcase/), or the
[impressjs showcase](https://arnehilmann.github.io/markdeck/showcase.impress/).

## tldr

Choose the right binary to download:
```
# MacOS (Intel)
curl -Lo markdeck https://github.com/arnehilmann/markdeck/releases/download/v0.60.0/markdeck.x86_64-apple-darwin
```

```
# Linux
curl -Lo markdeck https://github.com/arnehilmann/markdeck/releases/download/v0.60.0/markdeck.x86_64-unknown-linux-musl
```

```
chmod a+rx ./markdeck
./markdeck init my-slides
cd my-slides
../markdeck
```

```
open http://localhost:8080/
open http://localhost:8080/admin.html

# edit slides.md, add assets/*, examine example deck, read documentation, create ascii-art, ...
```

## optional components

| Renderer | Needed Component | Installation on MacOS
| --- | --- | ---
| render_ditaa, render_plantuml   | java runtime    | `brew install java`
| render_dot                      | graphviz        | `brew install graphviz`
| render_vegalite                 | vega-lite       | `brew install npm; npm install vega vega-cli vega-lite`
| render_qr                       | qrencode        | `brew install qrencode`
| render_svgbob                   | svgbob          | `brew install svgbob`
| render_a2s, render_a2sketch     | docker          | `docker run -d -p 22753:22753 arne/a2sketch:0.15`


## tldr, the old way

also see the old [README.md for v0.54](README-v0.54.md).

```
mkdir -p my-slides/deck && cd my-slides
echo -e '# Hello World!\n\n# Second Slide...' > slides.md
curl -LO https://raw.githubusercontent.com/arnehilmann/markdeck/main/docker-compose.yaml
docker-compose up
```

```
open http://localhost:8080/
open http://localhost:8080/admin.html

# edit slides.md, add assets/*, examine example deck, read documentation, create ascii-art, ...
```

## links

* [slide markup documentation](DOCUMENTATION.md)

* [todos](TODOS.md)

* [rewrite in rust](REWRITE_IN_RUST.md)


## how does this work

*markdeck* takes ```slide-*.md``` files in markdown format
and the assets subdir
and renders a html5 slidedeck, using [pandoc](http://pandoc.org) as converter
and [reveal.js](http://lab.hakim.se/reveal-js/) as the presenter framework.

see the
[side-by-side view](https://arnehilmann.github.io/markdeck/showcase/explain.html),
to get an idea how markdeck works and looks like, or have a look
at the [documentation](DOCUMENTATION.md).


## based on

[markdown](https://daringfireball.net/projects/markdown/syntax),
[pandoc](https://pandoc.org/),
[reveal.js](https://revealjs.com/#/),
[plantuml](http://wiki.plantuml.net/site/index),
[ditaamini](http://ditaa.sourceforge.net/),
[asciitosvg](https://github.com/dhobsd/asciitosvg),
[graphviz](https://www.graphviz.org/),
[asciinema](https://asciinema.org/),
[decktape](https://github.com/astefanutti/decktape),
[vega-lite](https://vega.github.io/vega-lite/),
[mathjax-pandoc-filter](https://www.npmjs.com/package/mathjax-pandoc-filter), and
[font-awesome](https://fontawesome.com/).


## known issues

* custom layout hard, but possible
* pixel-perfect layout nearly impossible
* see the [todos](TODOS.md)


## similar projects

* http://bigsense.github.io/
* http://slideshow-s9.github.io
* https://github.com/FormidableLabs/spectacle
* https://github.com/divshot/markdeck
* https://github.com/jxnblk/mdx-deck
* https://github.com/munen/p_slides
* https://github.com/regebro/hovercraft
* https://github.com/sinedied/backslide
* https://gitpitch.com/
* https://godoc.org/golang.org/x/tools/cmd/present
* https://www.deckset.com/
* https://yhatt.github.io/marp/
