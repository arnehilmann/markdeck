# ChangeLog

Starting with v0.52, all major changes will be documented here.


## v0.52.4

### Bugfixes

* move styles for code line-numbering to the default style

* remove need for special svg fontStyle css for a2sketch diagrams



## v0.52.2

### Features

* rendered svg gets embedded in `div class="render_..."` element, allowing easier styling via css

### Bugfixes

* a2sketch uses latest roughjs renderer now: a2sketch arrows get displayed

* decktape, the pdf renderer, was upgraded to latest version, thus avoiding deprecation warnings

* reveal-template patched, so that decktape identifies reveal slides again and thus using the correct plugin for pdf



## v0.52

### General Features

* the `themes` concept is working quite well: you can put all your assets you want to use in multiple
  slides (css, fonts, images, ...) in a `themes/my-theme` subfolder and specify this in your slides
  metadata with the `themes` setting (yes, right now you can specify multiple themes: one for typography,
  one for common graphics, one for ...)

* the [markdown preprocessor](https://github.com/jreese/markdown-pp) works quite well as well:
  the preprocessing step runs in the context of your top folder now, so when including resources
  (.md files, code snippets, etc) you dont have to put them in the assets folder any longer.


### General Bugfixes

* speaker notes working again

* custom a2s shapes working again
