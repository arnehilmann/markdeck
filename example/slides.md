---
title: markdeck
variant: impress
# pdf: markdeck-example.pdf
# standalone: markdeck-example.html
highlight_style: grayscale
# slideNumber: true
# autoSlide: 5000
# controls: true
# controlsTutorial: true
# controlsLayout: edges
# pdf_size: 1189x841
# pdf_size: 1024x768
asciinema: true
---


# markdeck {bgcss=sea-gradient x=0 y=0 .light-on-dark}

create cool slide decks using markdown only

| [github.com/arnehilmann/markdeck](https://github.com/arnehilmann/markdeck)

<small> arne@hilmann.de | 2018-11 🙃</small>


# features {rx=1 bg=#123456}

the whole deck as markdown

cool ui, based on
<span class="inline-stack">reveal<br/>impress</span>
.js


# features {rx=0 ry=1}

on-the-fly rendering of asciiart

<small>
boxes,
uml,
graphs,
charts,
equations,
qrcodes, …
</small>


# features {bg=DarkSlateBlue rx=-1 ry=0}

emojis and terminal sessions

on-the-fly reload when changing sources


# code, highlighted {bg=#ffeedd}

```java
public static final void main(String[] args) {
    // foo
}
```


# asciiart: ditaa {bg=SteelBlue rx=0 ry=-1 .inline}

```{.nohighlight style="width: 40%; height: 100%; font-size: 40%;"}
+=----------------------------+
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
+=----------------|-----------+
| Node B          |           |
|       /---------/           |
|       |                     |
|       v                     |
| +-----+----+   +----------+ |
| |          |   |          | |
| | Frontend |   | Bar      | |
| |          |   |          | |
| |          |   | {s}      | |
| +----------+   +----------+ |
+-----------------------------+
```
►
```{.render_ditaa args="--transparent --scale 1 --font 'Raleway 12'"}

+=----------------------------+
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
+=----------------|-----------+
| Node B          |           |
|       /---------/           |
|       |                     |
|       v                     |
| +-----+----+   +----------+ |
| |          |   |          | |
| | Frontend |   | Bar      | |
| |          |   |          | |
| |          |   | {s}      | |
| +----------+   +----------+ |
+-----------------------------+

```


# asciiart: plantuml {bg=lightblue .inline}

```{.nohighlight style="width: 40%; font-size: 40%;"}
@startuml
Bob->Alice : hello
Alice->Bob : oh, you again...
Bob->Alice : ??
@enduml
```
►
```{.render_plantuml args="-Sbackgroundcolor=transparent -SdefaultFontSize=24 -SdefaultFontName=Raleway"}
@startuml
Bob->Alice : hello
Alice->Bob : oh, you again...
Bob->Alice : ??
@enduml
```


# asciiart: graphviz {bg=DarkOrange rx=1 ry=0 .inline}

```{.nohighlight style="width: 50%; font-size: 40%;"}
digraph G {
    bgcolor=transparent;
    node [style=filled,color=white];

    a -> b -> c;
    a -> c;
    b -> d;
}
```
►
```render_dot
digraph G {
    bgcolor=transparent;
    node [style=filled,color=white];

    a -> b -> c;
    a -> c;
    b -> d;
}
```

# asciiart: vega-lite {bg=GhostWhite .inline}

```{.json style="width: 50%; font-size: 30%;"}
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
    }
}
```
►
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


# asciiart: a2s {bg=White bgcss=sky-gradient-13 .inline}

```{.nohighlight style="width: 40%;"}
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

[0]: {"fill": "#933"}
[1]: {"fill": "#bbb"}
```
►
```render_a2s
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


# asciiart: sketchy art {bg=White rx=0 ry=1 .inline}

```{.nohighlight style="width: 55%;"}
#=----------------------------#
| Node                        |
|                             |
|                             |
| #----------#   #----------# |
| |          |   |[s]       | |
| | Frontend |   | Foo      | |
| |          |   |          | |
| |  ^       |   |          | |
| |  |       |   |          | |
| #--|-------#   #----------# |
|    |                ^       |
|    |                |       |
|    '---- service ---'       |
|                             |
#-----------------------------#

```
►
```render_a2sketch


#=----------------------------#
| Node                        |
|                             |
|                             |
| #----------#   #----------# |
| |          |   |[s]       | |
| | Frontend |   | Foo      | |
| |          |   |          | |
| |  ^       |   |          | |
| |  |       |   |          | |
| #--|-------#   #----------# |
|    |                ^       |
|    |                |       |
|    '---- service ---'       |
|                             |
#-----------------------------#

[s]: {"a2s:type": "storage", "a2s:delref": true, "font-family": "Raleway"}
```


# asciiart: mathjax {bg=Teal}

```{.nohighlight style="width: 50%; font-size: 50%;"}
$a^2 + b^2 = c^2$
```
$a^2 + b^2 = c^2$

&nbsp;

```{.nohighlight style="width: 50%; font-size: 50%;"}
$$e = \mathop
    {\lim }\limits_{n \to \infty }
    \left( {1 + \frac{1}{n}} \right)^n$$
```
$$e = \mathop
    {\lim }\limits_{n \to \infty }
    \left( {1 + \frac{1}{n}} \right)^n$$


# terminal session: asciinema {bg=#121314}

<asciinema-player src="./assets/img/test.json"
    poster="npt:0:21"
    idle-time-limit=1
    speed=2
    rows=18
    font-size="medium"
></asciinema-player>


# Thank You! {bg=AliceBlue rx=-1 ry=0}

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


# {.skip skipon="reveal"}

This page intentionally left blank.



# {x=.5 y=.5 z=0 scale=4 skipon="reveal" id=overview}


# markdeck rulez! {x=3 y=-1.5 rotate-y=60 scale=3 bgcss=sea-gradient .light-on-dark}

![](assets/img/buddy-egyptian.svg)
