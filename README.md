# markdeck

markdown to sleek slides deck

example: [markdown](https://raw.githubusercontent.com/arnehilmann/markdeck/master/example/slides.md)
-> [html deck](https://arnehilmann.github.io/markdeck/)


# tl;dr

```
docker run -it --rm -v $PWD:/source:ro -v $PWD/slides:/target -p 8080:8080 arne/markdeck:0.9
```

```
open http://localhost:8080
```

```
# edit slides.md, add assets/ and config, consult documentation below, ...
```


# documentation

*markdeck* takes a ```slides.md``` file in markdown format, a few config files, and the assets subdir
and converts these in a html5 slidedeck, using [pandoc](http://pandoc.org) as converter
and [reveal.js](http://lab.hakim.se/reveal-js/) as web framework.

see the [example slides](https://raw.githubusercontent.com/arnehilmann/markdeck/master/example/slides.md)
for further details.

## author your deck

To start with *markdeck*, see [the tl;dr](#tldr) section.

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

* with a solid color
```
# your title {bg=COLOR}
```

* with an image

```
# your title {bg=COLOR;PATH_TO_IMAGE}
```

the text color gets set depending on the COLOR argument
(using a dark color results in white text, for example)



## asciiart

codeblocks of the class "plantuml", "ditaa", "dot", or "qr" get replaced during
conversion by rendered images (in the following examples: plantuml):

    ```plantuml
    ...
    ```

The images are cached locally, changes to the codeblock or its parameters result
in a re-rendering.

the default commandline parameters for the asciiart renderer are defined
in the [render-asciiart-filter.config](example/render-asciiart-filter.config) file.

if you want to change these parameters, you can specify them as follows (note:
you have to use the slightly longer notation with curly braces):
    
    ```{.plantuml args="..."}
    ...
    ```

### asciiart: plantuml

* [plantuml website](http://plantuml.com)
* [language reference](http://plantuml.com/PlantUML_Language_Reference_Guide.pdf)
* [common commands](http://plantuml.com/commons)
* [common settings](http://plantuml.com/skinparam)
* [sequence diagram](http://plantuml.com/sequence-diagram)
* [example plantuml slide](https://arnehilmann.github.io/markdeck/#/plantuml)

<!-- -->
    ```plantuml
    @startuml
    Bob->Alice : hello
    Alice->Bob : oh, you again...
    @enduml
    ```

### asciiart: ditaa

* [original project](https://github.com/stathissideris/ditaa)
* [documentation](https://github.com/stathissideris/ditaa#usage-and-syntax)
* fork of ditaa, with minimal dependencies: [ditaamini @ github](https://github.com/pepijnve/ditaa.git)
* [example ditaa slide](https://arnehilmann.github.io/markdeck/#/ditaa)

<!-- -->
    ```ditaa
    +--------+   +-------+    +-------+
    |        +---+ ditaa +--->|       |
    |  Text  |   +-------+    |diagram|
    |Document|   |!magic!|    |       |
    |     {d}|   |       |    |       |
    +---+----+   +-------+    +-------+
        :                          ^
        |       Lots of work       |
        +--------------------------+
    ```

### asciiart: graphviz

* [graphviz website](http://www.graphviz.org)
* [dot language](http://www.graphviz.org/pdf/dotguide.pdf)
* [attributes](http://www.graphviz.org/content/attrs)
* [node shapes](http://www.graphviz.org/content/node-shapes)
* [arrow shapes](http://www.graphviz.org/content/arrow-shapes)
* [gallery of examples](http://www.graphviz.org/Gallery.php)
* [example graphviz slide](https://arnehilmann.github.io/markdeck/#/graphviz)

<!-- -->
    ```dot
    digraph G {
        bgcolor=transparent;
        node [style=filled,color=white];

        a -> b -> c;
        a -> c;
        b -> d;
    }
    ```

### asciiart: qr

* [libqrencode website](https://fukuchi.org/works/qrencode/)
* [example qr slide](https://arnehilmann.github.io/markdeck/#/markdeck-github)

<!-- -->
    ```qr
    https://github.com/arnehilmann/markdeck
    ```


## asciinema

* [asciinema website](https://asciinema.org)
* [html player attributes](https://github.com/asciinema/asciinema-player#asciinema-player-element-attributes)

asciinema allows you to record a terminal session in a local file, and to
replay that session within your slides.
For recording, you have to [install asciinema](https://asciinema.org/docs/installation)
locally on your machine, then start recording with ```asciinema rec assets/YOUR_SESSION_FILE_HERE.json```.

the javascript for the asciinema-player must be loaded explicitly: add the following
code to the end of your ```slides.md```
```
<script src="assets/3rdparty/asciinema-player.js"></script>
```

embed the player with the following code (and pay attention to the ```rows``` attribute):
```
<asciinema-player
    src="./assets/YOUR_SESSION_FILE_HERE.json"
    poster="npt:0:11"
    idle-time-limit=1
    speed=2
    rows=18
    font-size="medium"
></asciinema-player>
```


# for adventurous developers

```
git clone https://arnehilmann.github.io/markdeck
cd markdeck
docker run -it -v $PWD:/source:ro -v $PWD/docs:/target --rm -p 8080:8080 arne/markdeck
open http://localhost:8080
# edit slides.md, change css, add images, ...
```
*Note: the ```/source``` folder could and should be mounted read-only.*


# TODO

* document/build/provide miniditaa jar
* docgumnt/build/provide highlight.js with all languages bundled
* fix font problem in pdf (regarding non-local font resources)
* provide locality check (no external dependencies, usefull when no internet connection available)
* provide font helper (download fonts, change css definitions)
* integrate impress.js option (filter for coordinate handling ala hoovercraft, ...)
* allow page number instead of navigation
* ~minimize files needed as /source (move slides.css and filter config inside markdeck as defaults, allow customized files in /source)~
* ~use full-fledged hightligt.js plugin~
* ~add documentation (config, markdown, renderer, ...)~
* ~add tl;dr section~
* ~make asciiart rendering paramterizable (<-- is that a word?)~
* ~make rendered images transparent~
* ~pdf rendering of whole deck~
* ~add dev mode for markdeck~
* ~remove obsolete asciiart images rendered by filter~
* ~add short-notation for background settings~
* ~handle change in asciiart parameters~
* ~add simple QR Code generator (for url on last slide, for example)~
