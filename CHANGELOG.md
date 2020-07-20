# ChangeLog

Starting with v0.52, all major changes will be documented here.

## v0.52.0

### Features

* the `themes` concept is working quite well: you can put all your assets you want to use in multiple
  slides (css, fonts, images, ...) in a `themes/my-theme` subfolder and specify this in your slides
  metadata with the `themes` setting (yes, right now you can specify multiple themes: one for typography,
  one for common graphics, one for ...)

* the [markdown preprocessor](https://github.com/jreese/markdown-pp) works quite well as well:
  the preprocessing step runs in the context of your top folder now, so when including resources
  (.md files, code snippets, etc) you dont have to put them in the assets folder any longer.


### Bugfixes

* speaker notes working again

* custom a2s shapes working, but see #IncompatibleChanges


### Incompatible Changes

* custom a2s shapes (`.path` files) must be moved to the top folder now
  (besides your .md files): the `a2s-custom-types`
  folder wont be searched for .path files any longer...
