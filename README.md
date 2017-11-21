# md2deck

markdown to sleek slides deck

example: [markdown](https://raw.githubusercontent.com/arnehilmann/md2deck/master/example/slides.md)
-> [html deck](https://arnehilmann.github.io/md2deck/)


## tl;dr

```
git clone https://arnehilmann.github.io/md2deck
cd md2deck
docker run -it -v $PWD:/source:ro -v $PWD/docs:/target --rm -p 8080:8080 arne/md2deck
open http://localhost:8080
# edit slides.md, change css, add images, ...
```


## TODO

* ~add tl;dr section~
* add documentation (config, markdown, renderer, ...)
* ~make asciiart rendering paramterizable (<-- is that a word?)~
* ~make rendered images transparent~
* improve text layout
* ~pdf rendering of whole deck~
* ~add dev mode for md2deck~
* ~remove obsolete asciiart images rendered by filter~
* ~add short-notation for background settings~
* document/build/provide miniditaa jar
* handle change in asciiart parameters
* ~add simple QR Code generator (for url on last slide, for example)~
* fix font problem in pdf
* provide localality check (no external dependencies, usefull when no internet connection available)
* provide font helper (download fonts, change css definitions)
* integrate impress.js option
