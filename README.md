# markdeck

author cool slide decks, text-only, offline-ready, collaborative


## why?

* cool looking slides
* no uplink required, neither when authoring, nor presenting
* text-only, easy syntax (markdown)
* fast-n-easy to write
* easy to collaborate/reuse
* supports unicode, emojis, fontawesome, asciiart
* self-documenting [documentation slides](DOCUMENTATION.md)

You can also visit the shiny [landing page](https://arnehilmann.github.io/markdeck/)
or the [showcase](https://arnehilmann.github.io/markdeck/showcase/).


## install markdeck, tl;dr

You need `bash`, `curl`, `docker-compose` and an empty directory, then run the following command:
```
curl https://raw.githubusercontent.com/arnehilmann/markdeck/master/scaffold | bash
```

This will download a minimal setup, download all needed docker images,
then markdeck gets started...

Use `Ctrl-C` to stop markdeck, and `./start` or `./update-markdeck` to do the suitable things.


## documentation

... can be found in [DOCUMENTATION.md](DOCUMENTATION.md)


## how to start from scratch

```
mkdir my-slides && cd my-slides
curl -O https://raw.githubusercontent.com/arnehilmann/markdeck/master/scaffold
./update-markdeck
```

```
open http://localhost:8080
```

```
# edit slides.md, add assets/, consult documentation, ...
```


## how does this work

*markdeck* takes ```slide-*.md``` files in markdown format
and the assets subdir
and renders a html5 slidedeck, using [pandoc](http://pandoc.org) as converter
and [reveal.js](http://lab.hakim.se/reveal-js/) as the presenter framework.

see the
[side-by-side view](https://arnehilmann.github.io/markdeck/showcase/explain.html),
to get an idea how markdeck works and looks like, or have a look
at the [documentation](DOCUMENTATION.md).


## known issues

* custom layout hard, but possible
* pixel-perfect layout nearly impossible
* see the [todos](TODOS.md)


# similar projects

* https://github.com/divshot/markdeck
