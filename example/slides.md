---
title: markdeck
# variant: impress
pdf: markdeck-example.pdf
# standalone: markdeck-example.html
# slideNumber: true
# autoSlide: 5000
# controls: true
# controlsTutorial: true
# controlsLayout: edges
# pdf_size: 1189x841
# pdf_size: 1024x768
asciinema: true
---

# markdeck {bg=black;assets/img/bg.colorfull.png .colorfull}

create cool slide decks using markdown only

| [github.com/arnehilmann/markdeck](https://github.com/arnehilmann/markdeck)

| [markdeck on docker hub](https://hub.docker.com/r/arne/markdeck/)

<small> arne@hilmann.de | 2018-04 🙃</small>


# features {rel-x=1}

the whole deck as markdown

cool ui, based on reveal.js


# features {bg=Teal rel-x=0 rel-y=1}

on-the-fly rendering of asciiart

<small>
boxes,
uml,
graphs,
charts,
equations,
qrcodes, …
</small>


# features {bg=DarkSlateBlue rel-x=-1 rel-y=0}

emojis and terminal sessions

on-the-fly reload when changing sources


# asciiart: boxes {bg=SteelBlue}

ditaa

```{.render_ditaa args="--transparent --scale 2 --font 'EB Garamond 12'"}

+=----------------------------+   +=----------------------------+
| Node                        |   | Node                        |
|                             |   |                             |
|                             |   |                             |
| +----------+   +----------+ |   | +----------+   +----------+ |
| |          |   |          | |   | |          |   |          | |
| | Frontend |   | Foo      | |   | | Frontend |   | Bar      | |
| |          |   |          | |   | |          |   |          | |
| |          |   |          | |   | |          |   |          | |
| |          |   | {s}      | |   | |          |   | {s}      | |
| +-----+----+   +----------+ |   | +-----+----+   +----------+ |
|       ^                     |   |       ^                     |
|       |                     |   |       |                     |
|       +-------------service-------------+                     |
|                             |   |                             |
+-----------------------------+   +-----------------------------+

```


# asciiart: uml {bg=lightblue rel-x=0 rel-y=-1}

plantuml

```{.render_plantuml args="-Sbackgroundcolor=transparent -SdefaultFontSize=24 -SdefaultFontName=EB\ Garamond"}
@startuml
Bob->Alice : hello
Alice->Bob : oh, you again...
Bob->Alice : ??
@enduml
```


# asciiart: graphs {bg=DarkOrange}

graphviz

```render_dot
digraph G {
    bgcolor=transparent;
    node [style=filled,color=white];

    a -> b -> c;
    a -> c;
    b -> d;
}
```

# asciiart: charts {bg=GhostWhite rel-x=1 rel-y=0}

vega-lite

```render_vegalite
{
    "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
    "data": {
        "values": [
            {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
            {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
            {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
        ]
    },
    "width": 600,
    "height": 300,
    "mark": "area",
    "encoding": {
        "x": {"field": "a", "type": "ordinal"},
        "y": {"field": "b", "type": "quantitative", "scale": {"domain": [0, 100]}}
    },
    "config": {
        "axis": {
            "labelFont": "EB Garamond",
            "labelFontSize": 18,
            "titleFont": "EB Garamond",
            "titleFontSize": 24,
            "titleAngle": 0
        },
        "axisX": {
            "labelAngle": 0
        }
    }
}
```


# asciiart: sketchart {bg=White}

a2sketch

```render_a2sketch
     #-------------------.
     |[0]                |
     | .---# .---# #---. |
     | |[1]| |[1]| |[1]| |
     | #---' #---' '---# |
     |                   |
     |   ^     ^     ^   |
     #---+-----+-----+---#
     |   |     |     |   |
     |   a     2  sketch |
     '-------------------#
 github.com/arnehilmann/a2sketch


[0]: {"fill": "#933", "a2s:delref": true, "fillStyle": "solid"}
[1]: {"fill": "#bbb", "a2s:delref": true, "fillStyle": "solid"}
```


# asciiart: equations {bg=Teal}

mathjax

$a^2 + b^2 = c^2$

$$e = \mathop {\lim }\limits_{n \to \infty } \left( {1 + \frac{1}{n}} \right)^n$$


# terminal session: asciinema {bg=#121314}

<asciinema-player src="./assets/img/test.json"
    poster="npt:0:21"
    idle-time-limit=1
    speed=2
    rows=18
    font-size="medium"
></asciinema-player>


# Thank You! {bg=AliceBlue rel-x=0 rel-y=1}

[pandoc](http://pandoc.org)
[reveal.js](http://lab.hakim.se/reveal-js/#/)
[plantuml](http://plantuml.com)
[ditaamini](https://github.com/pepijnve/ditaa.git)
[graphviz](http://www.graphviz.org)
[asciinema](https://github.com/asciinema/asciinema-player)
[decktape](https://github.com/astefanutti/decktape)
[vega-lite](https://vega.github.io/vega-lite/)
[math-jax](https://www.mathjax.org)
🙃


# {bg=White;assets/img/wordcloud.svg .flush-right}

[`https://github.com/arnehilmann/markdeck`{.render_qr}](https://github.com/arnehilmann/markdeck)
