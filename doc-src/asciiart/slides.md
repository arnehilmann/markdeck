---
title: markdeck - asciiart
highlight_style: github-gist
controls: true
controlsTutorial: true
controlsLayout: edges
---


# asciiart {bgcss=sea-gradient .light-on-dark}

part of the
[markdeck docs](https://github.com/arnehilmann/markdeck/blob/master/DOCUMENTATION.md){target="_parent"}

|
|

!INCLUDE "/source/intro.md"


# ditaa

```{.render_ditaa args="--transparent --scale 1 --font 'Raleway'"}
+-----------------------------+
| Node A                      |
|                             |
| +----------+   +----------+ |
| |          |   |          | |
| | Frontend |   | Foo      | |
| |          |   |          | |
| |          |   | {s}      | |
| +-----+----+   +----------+ |
|       ^                     |
|       |                     |
|       \-service-\           |
|                 |           |
+-----------------|-----------+
                  |
```

[ditaa.sourceforge.net/](http://ditaa.sourceforge.net/)


# plantuml

```{.render_plantuml args="-Sbackgroundcolor=transparent -SdefaultFontSize=24 -SdefaultFontName=Raleway"}
@startuml
Bob->Alice : hello
Alice->Bob : oh, you again...
Bob->Alice : ??
@enduml
```

[http://wiki.plantuml.net/site/index](http://wiki.plantuml.net/site/index)


# a2s

```render_a2s
    #-------------------.
    |[0]                |
    | .---# .---# #---. |
    | |[1]| |[1]| |[1]| |
    | #---' #---' '---# |
    |   ^     ^     ^   |
    #---+-----+-----+---#
    |   |     |     |   |
    |   a     2  sketch |
    '-------------------#
github.com/arnehilmann/a2sketch

[0]: {"fill": "#933","a2s:delref":true}
[1]: {"fill": "#bbb","a2s:delref":true,"a2s:type":"storage"}
```

[https://github.com/dhobsd/asciitosvg](https://github.com/dhobsd/asciitosvg#how-do-i-draw)


# a2sketch

```render_a2sketch
    #-------------------.
    |[0]                |
    | .---# .---# #---. |
    | |[1]| |[1]| |[1]| |
    | #---' #---' '---# |
    |   ^     ^     ^   |
    #---+-----+-----+---#
    |   |     |     |   |
    |   a     2  sketch |
    '-------------------#
github.com/arnehilmann/a2sketch

[0]: {"a2s:delref":true}
[1]: {"fill": "#bbb","a2s:delref":true,"a2s:type":"storage"}
```

[https://github.com/dhobsd/asciitosvg](https://github.com/dhobsd/asciitosvg#how-do-i-draw)


# graphviz

```{.render_dot args="-Nfontname=Raleway"}
digraph G {
    bgcolor=transparent;
    node [style=filled,color=white];

    a -> b -> c;
    a -> c;
    b -> d;
}
```

[https://www.graphviz.org/documentation/](https://www.graphviz.org/documentation/)


# vega-lite

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
    "width": 250,
    "height": 300,
    "mark": "area",
    "encoding": {
        "x": {"field": "a", "type": "ordinal"},
        "y": {"field": "b", "type": "quantitative", "scale": {"domain": [0, 100]}}
    },
    "config": {
        "axis": {
            "labelFont": "Raleway",
            "labelFontSize": 18,
            "titleFont": "Raleway",
            "titleFontSize": 24,
            "titleAngle": 0
        },
        "axisX": {
            "labelAngle": 0
        }
    }
}
```

[https://vega.github.io/vega-lite/docs/](https://vega.github.io/vega-lite/docs/)


# mathjax

$$e = \mathop
    {\lim }\limits_{n \to \infty }
    \left( {1 + \frac{1}{n}} \right)^n$$

[https://www.npmjs.com/package/mathjax-pandoc-filter](https://www.npmjs.com/package/mathjax-pandoc-filter)


# qr code

`https://github.com/arnehilmann/markdeck`{.render_qr}

[https://github.com/fukuchi/libqrencode](https://github.com/fukuchi/libqrencode)


# next steps {bgcss=sea-gradient .light-on-dark}

find more
[documentation](https://github.com/arnehilmann/markdeck/blob/master/DOCUMENTATION.md#self-documenting-documentation-slides){target="_parent"}
