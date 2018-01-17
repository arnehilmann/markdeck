---
title: markdeck
pdf: markdeck-example.pdf
standalone: markdeck-example.html
---

# markdeck

create cool slide decks using markdown only

| [github.com/arnehilmann/markdeck](https://github.com/arnehilmann/markdeck)

| [markdeck on docker hub](https://hub.docker.com/r/arne/markdeck/)

<small> arne@hilmann.de | 2018-01 🙃</small>


# features {bg=black;assets/img/bg.colorfull.png .colorfull}

the whole deck as markdown

on-the-fly rendering of asciiart<br>
<small>(boxes, uml, graphs, charts, equations, qrcodes, …)</small>

supports emojis and terminal sessions

cool ui, based on reveal.js

on-the-fly reload when changing sources


# boxes: ditaa {bg=SteelBlue}

```render_ditaa
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


# uml: plantuml {bg=lightblue}

```render_plantuml
@startuml
Bob->Alice : hello
Alice->Bob : oh, you again...
Bob->Alice : ??
@enduml
```


# graphs: graphviz {bg=DarkOrange}

```render_dot
digraph G {
    bgcolor=transparent;
    node [style=filled,color=white];

    a -> b -> c;
    a -> c;
    b -> d;
}
```

# charts: vega lite {bg=GhostWhite}

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
            "titleFontSize": 24,
            "titleAngle": 0
        },
        "axisX": {
            "labelAngle": 0
        }
    }
}
```


# equations: mathjax {bg=Teal}

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


# Thank You! {bg=AliceBlue}

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


# {bg=White;assets/img/wordcloud.svg .flush-text-left}

```render_qr
https://github.com/arnehilmann/markdeck
```
