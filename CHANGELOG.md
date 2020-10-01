# ChangeLog

Starting with v0.52, all major changes will be documented here.

## v0.53.4

### Features

* When using markdeck `themes`: you can store your themes in a central folder 
  `$HOME/.config/markdeck/themes` now,  allowing a consistent look-n-feel 
  across multiple decks. Just keep in mind that your deck sources are not
  self-contained any longer (meaning: other people cannot build the same deck
  without that themes folder).

### Bugfixes

* `THEME_FOLDER` may be empty now.

* `explain.html` works again for reveal decks with subslides.



## v0.53.0

### Features

* only minimal set of services get started with `markdeck`: pandoc, web,
  a2sketch, friends. All other services are optional now: pdf, standalone,
  jupyter, jupyterlab.

  If you want to render pdf, standalone html, or jupyter
  notebooks, state them explicitely during start:
  `./markdeck start pdf standalone jupyter jupyterlab`

  _Note:_ This is a breaking change! Previous versions of `markdeck` started
  all  known services, now you have to specify them explicitely.

  _Note:_ That also means, that the images of those services are not fetched
  automatically any more! Keep that in mind if you want to use these optional
  services when going offline.

  _Advice:_ Just to be sure, run 
  `./markdeck start pdf standalone jupyter jupyterlab`
  once to download all needed images (just in case).

* files with suffix `.ipynb+md` get convert to jupyter notebooks, stored under
  `nbs_generated`. You have to start the optional service `jupyter` with
  `markdeck start jupyter`.

* jupyter notebooks can be served from `nbs_generated` with the optional
  services `jupyterlab`: `markdeck start jupyterlab`.



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
