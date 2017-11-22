# md2deck

markdown to sleek slides deck

example: [markdown](https://raw.githubusercontent.com/arnehilmann/md2deck/master/example/slides.md)
-> [html deck](https://arnehilmann.github.io/md2deck/)


# tl;dr

```
git clone https://arnehilmann.github.io/md2deck
cd md2deck
docker run -it -v $PWD:/source:ro -v $PWD/docs:/target --rm -p 8080:8080 arne/md2deck
open http://localhost:8080
# edit slides.md, change css, add images, ...
```
*Note: the ```/source``` folder could and should be mounted read-only.*


# documentation

md2deck takes a ```slides.md``` file in markdown format, a few config files, and the assets subdir
and converts these in a html5 slidedeck, using pandoc as converter and reveal.js as web framework.
see the [example slides](https://raw.githubusercontent.com/arnehilmann/md2deck/master/example/slides.md)
for further details.

## author your deck

To start with ```md2deck```, see [the tl;dr](#tldr) section.

Every change you make to the ```slides.md``` file, the various config files, or the
```assets/``` subdir, triggers a rebuild of your deck.
The integrated web server then pushes these changes to your browser, so no need to
reload your slides.


## slides in general

### reveal.js

documentation of [reveal.js](https://github.com/hakimel/reveal.js/)
(see also the [promo slidedeck](http://lab.hakim.se/reveal-js/#/))

### background shortcut

specify the background of your slide:

with a solid color
```
# your title {bg=COLOR}
```

or with an image

```
# your title {bg=COLOR;PATH_TO_IMAGE}
```

the text color gets set depending on the COLOR argument
(using a dark color results in white text, for example)



## asciiart

codeblocks of the class "plantuml", "ditaa", "dot", or "qr" get replaced during
conversion by rendered images (in the following examples: plantuml):

```
` ` `plantuml
...
```

The images are cached locally, changes to the codeblock or its parameters result
in a re-rendering.

the default commandline parameters for the asciiart renderer are defined
in the ```render-asciiart-filter.config``` file.

if you want to change these parameters, you can specify them as follows (note:
here you cannot use the class shortcut notation, but the slightly longer notation
with curly braces):
```
` ` `{.plantuml args="..."}
...
```

### asciiart: plantuml

* [plantuml website](http://plantuml.com)
* [language reference](http://plantuml.com/PlantUML_Language_Reference_Guide.pdf)
* [common commands](http://plantuml.com/commons)
* [common settings](http://plantuml.com/skinparam)

```
` ` `plantuml
@startuml
Bob->Alice : hello
Alice->Bob : oh, you again...
@enduml
` ` `
```

### asciiart: ditaa

* [original project](https://github.com/stathissideris/ditaa)
* [documentation](https://github.com/stathissideris/ditaa#usage-and-syntax)
* fork of ditaa, with minimal dependencies: [ditaamini @ github](https://github.com/pepijnve/ditaa.git)

```
` ` `ditaa
    +--------+   +-------+    +-------+
    |        +---+ ditaa +--->|       |
    |  Text  |   +-------+    |diagram|
    |Document|   |!magic!|    |       |
    |     {d}|   |       |    |       |
    +---+----+   +-------+    +-------+
        :                          ^
        |       Lots of work       |
        +--------------------------+
` ` `
```

### asciiart: graphviz

* [graphviz website](http://www.graphviz.org)
* [dot language](http://www.graphviz.org/pdf/dotguide.pdf)
* [attributes](http://www.graphviz.org/content/attrs)
* [node shapes](http://www.graphviz.org/content/node-shapes)
* [arrow shapes](http://www.graphviz.org/content/arrow-shapes)
* [gallery of examples](http://www.graphviz.org/Gallery.php)

```
` ` `dot
digraph G {
    bgcolor=transparent;
    node [style=filled,color=white];

    a -> b -> c;
    a -> c;
    b -> d;
}
` ` `
```


# TODO

* add documentation (~config, markdown,~ renderer, ...)
* improve text layout
* document/build/provide miniditaa jar
* fix font problem in pdf
* provide localality check (no external dependencies, usefull when no internet connection available)
* provide font helper (download fonts, change css definitions)
* integrate impress.js option
* ~add tl;dr section~
* ~make asciiart rendering paramterizable (<-- is that a word?)~
* ~make rendered images transparent~
* ~pdf rendering of whole deck~
* ~add dev mode for md2deck~
* ~remove obsolete asciiart images rendered by filter~
* ~add short-notation for background settings~
* ~handle change in asciiart parameters~
* ~add simple QR Code generator (for url on last slide, for example)~
