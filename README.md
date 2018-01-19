# markdeck

markdown to cool slides deck

example:
[markdown](https://raw.githubusercontent.com/arnehilmann/markdeck/master/example/slides.md)
->
[html deck](https://arnehilmann.github.io/markdeck/)
[html/markdown side-by-side](https://arnehilmann.github.io/markdeck/explain.html)
->
[pdf](https://arnehilmann.github.io/markdeck/markdeck-example.pdf)


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


# example

*markdeck* takes ```slide-*.md``` files in markdown format
and the assets subdir
and renders a html5 slidedeck, using [pandoc](http://pandoc.org) as converter
and [reveal.js](http://lab.hakim.se/reveal-js/) as the presenter framework.

see the
[side-by-side view](https://arnehilmann.github.io/markdeck/explain.html),
to get an idea how markdeck works and looks like...


# documentation

see the [separate documentation](/markdeck/blob/master/DOCUMENTATION.md).
