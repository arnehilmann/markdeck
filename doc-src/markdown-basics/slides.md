---
title: markdeck - markdown basics
highlight_style: github-gist
# pdf: markdeck-scaffold.pdf
# slideNumber: true
controls: true
controlsTutorial: true
controlsLayout: edges
---


# the markdown basics {bgcss=sea-gradient .light-on-dark}

part of the
[markdeck docs](https://github.com/arnehilmann/markdeck/blob/master/DOCUMENTATION.md){target="_parent"}

|
|

!INCLUDE "/source/intro.md"


# source files

You can put all your slides in one ```slides.md``` file

or
you split them into different files
(e.g. ```slides-part-1.md, slides-part-2.md, ...```)

all files matching ```slide*.md``` are source files


# a new slide

To begin a new slide,
simply type a `#` followed by the headline


# 

empty headlines are allowed, too</br>
(just add a single space after the `#`)


# layout basics

All content gets centered and scaled to fit
nicely into the browser window.


# markdown syntax 101

Normal text renders as normal text.<small>tadahh</small>

Single
newlines
get
removed.

To actually start a new paragraph,
insert an empty line.

# lists

unordered

* item a
* item b

ordered

1. item a
1. item b

<small>Note the automagical numbering</small>


# markup

_emphasized text_


# links

[link to other slide](#code)

[link to external url](https://arnehilmann.github.io/markdeck/){target="_blank"}

![images](assets/buddy-egyptian.svg)


# official definitions

[markdown syntax](https://daringfireball.net/projects/markdown/syntax){target="_blank"}

[pandoc extensions](https://pandoc.org/MANUAL.html#pandocs-markdown){target="_blank"}


# code

```java
public static final void main(String[] args) {
    // ...
}
```

[list of all known languages](https://highlightjs.org/static/demo/){target="_blank"}


# eye candy

unicode: ♥

emojis: 😎

font-awesome: ![](fab fa-github)


# local helper

You can find a set of frequently used unicode characters,
emojis, asciiart editors, and gradient tools
[on the helper pages](http://localhost:8081/){target="_blank"}.


# raw html

if in dire need,
you can still add raw html:</br>
```</br>``` to force a line break

```<small></small>```
for <small>small font</small>

|
|
```|``` for vertical space


# next steps

[find more documentation, esp. slide design and metadata](https://github.com/arnehilmann/markdeck/blob/master/DOCUMENTATION.md){target="_parent"}
