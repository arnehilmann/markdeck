# TODOS

* documentation: metadata
* documentation: themes
* documentation: impress.js variant
* documentation: fragments

* try to run without docker
* test on windows10
* make svg inlining optional, or copy attributes
* provide resource helper: download remote stuff (ala https://webpack.js.org/loaders/html-loader/ or so)
* try papercss
* try feathericons
* impressjs: define new coordinate system on-the-fly

* provide font helper (download fonts, change css definitions)
* document/build/provide highlight.js with all languages bundled
* provide locality check (no external dependencies, usefull when no internet connection available)
* integrate impress.js option (filter for coordinate handling ala hoovercraft, ...)

* serve /apple-touch-icon-precomposed.png /apple-touch-icon.png /favicon.ico

* improve fragment handling
* support rough-notes

* start pdf/standalone/... only when needed, restart if necessary
* jupyter notebook -> ipynb --trigger--> md -> slides deck (incl image references)
* pdf handout for jupyter notebook
* .markdeckignore (incl README.md e.g.)


# DONE

* ~update decktape component~
* ~document/build/provide miniditaa jar~
* ~try excalidraw~
* ~update font-awesome, add some cheatsheets~
* ~add themes: extra folders, reload-on-change~
* ~minimize css styles~
* ~make `markdeck` command more robust (should work with both GNU and BSD toolset)~
* ~update helper stuff: asciiflow, font-awesome table, unicode examples~
* ~allow page number instead of navigation~
* ~fix font problem in pdf (regarding non-local font resources)~
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
