# markdeck

markdown to cool slides deck

## example

[slide deck](https://arnehilmann.github.io/markdeck/)

[side-by-side view](https://arnehilmann.github.io/markdeck/explain.html)<br/>
(the rendered slide on the left and the markdown source on the right side)

[handout](https://arnehilmann.github.io/markdeck/markdeck-example.pdf)

[markdown source](https://raw.githubusercontent.com/arnehilmann/markdeck/master/example/slides.md)


# tl;dr

```
docker run -it --rm --shm-size 1G \
    -v $PWD:/source:ro -v $PWD/slides:/target \
    -p 8080:8080 -p 8081:8081 arne/markdeck:0.20
```

```
open http://localhost:8080
```

```
# edit slides.md, add assets/, consult documentation, ...
```


# how

*markdeck* takes ```slide-*.md``` files in markdown format
and the assets subdir
and renders a html5 slidedeck, using [pandoc](http://pandoc.org) as converter
and [reveal.js](http://lab.hakim.se/reveal-js/) as the presenter framework.

see the
[side-by-side view](https://arnehilmann.github.io/markdeck/explain.html),
to get an idea how markdeck works and looks like, or have a look
at the [documentation](DOCUMENTATION.md).


# why

* cool looking slides
* fast/easy to write
* easy to collaborate/reuse
* all sources under version control
* no binary formats


# known issues

* custom layout hard, but possible
* pixel-perfect layout nearly impossible


# documentation

see the [separate documentation](DOCUMENTATION.md) and [todos](TODOS.md).
