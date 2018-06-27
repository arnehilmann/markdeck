# markdeck

markdown to cool slides deck

## install markdeck
You need `bash`, `curl`, `docker-compose` and an empty directory to run the following command:
```
curl https://raw.githubusercontent.com/arnehilmann/markdeck/master/scaffold|bash
```

This script will download a minimal setup, then it will start markdeck...


## showcase

[slide deck](https://arnehilmann.github.io/markdeck/showcase/)

[side-by-side view](https://arnehilmann.github.io/markdeck/showcase/explain.html)<br/>
(markdown source on the right side, the rendered slide on the left)

[handout](https://arnehilmann.github.io/markdeck/showcase/markdeck-example.pdf)

[markdown source](https://raw.githubusercontent.com/arnehilmann/markdeck/master/example/showcase/slides.md)


## how to start from scratch

```
mkdir my-slides && cd my-slides
curl -O https://raw.githubusercontent.com/arnehilmann/markdeck/master/docker-compose.yaml
```

```
docker-compose pull
docker-compose up
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


## why should I use this

* cool looking slides
* fast/easy to write
* easy to collaborate/reuse
* all sources under version control
* no binary formats


## known issues

* custom layout hard, but possible
* pixel-perfect layout nearly impossible


## documentation

see the [separate documentation](DOCUMENTATION.md) and [todos](TODOS.md).
