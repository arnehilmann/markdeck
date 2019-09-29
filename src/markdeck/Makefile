SHELL := /bin/bash

all: .info-all render sync config pandoc
	@echo "-------- /rerendering ---------"
	@echo

.info-all:
	@echo "-------- rerendering ---------"


.info-render:
	@echo "-------- rerendering prep ---------"

render: .info-render /target/assets/css/rerendering.css /target/assets/rendered
	@echo "-------- /rerendering prep ---------"
	@echo

/target/assets/css/rerendering.css: /markdeck/assets/markdeck/css/when-rerendering.css /target/assets/css
	cp $< $@

/target/assets/css:
	mkdir -p $@

/target/assets/rendered:
	mkdir -p $@


.info-sync:
	@echo "-------- rsync output --------"

sync: .info-sync .rsync .fc-list
	@echo "-------- /rsync ---------"
	@echo

.rsync: /target .rsync-sync /target/assets/css/slides.scss /target/assets/css/render-pdf.css

.rsync-sync: /markdeck/assets $(wildcard /source/assets)
	# FIXME the dynamically generated scss and css files are deleted by rsync.
	# If there was a way to separate the files coming from rsync and the
	# dynamically generated files this would be ideal
	# -rsync -auv --delete $^ /target/
	-rsync -auv $^ /target/

.fc-list:
	@echo
	@echo "Know fonts:"
	@fc-list

/target/assets/css/slides.scss /target/assets/css/slides.impress.css /target/assets/css/render-pdf.css:
	touch $@


.info-sass:
	@echo "-------- sass output --------"

sass: .info-sass \
	/target/assets/css/slides.css \
	/target/assets/css/slides.impress.css \
	/target/assets/markdeck/css/markdeck.impressjs.css \
	/target/assets/markdeck/css/markdeck.revealjs.css \
	.sync-custom-themes \
	$(addprefix /target/assets/3rdparty/reveal.js/css/theme/,$(addsuffix .css,$(basename $(notdir $(wildcard /target/assets/3rdparty/reveal.js/css/theme/source/*.scss)))))

	@echo "-------- /sass ---------"
	@echo

.sync-custom-themes: $(wildcard /source/assets/css/theme/source/*.scss)
	rsync -au $^ /target/assets/3rdparty/reveal.js/css/theme/source/


.info-config:
	@echo "-------- config --------"

config: .info-config .metadata
	jq '. | .' < /target/.meta/config.json
	@echo "ASCIIART_CONFIG=${ASCIIART_CONFIG}"
	@echo "-------- /config --------"
	@echo

.metadata: /target/.meta /target/.meta/config.json

/target/.meta/config.json: $(wildcard /source/slide*.md) /markdeck/note.md /markdeck/defaults.yaml
	pandoc --template=/markdeck/metadata.template $^ > $@

/target/.meta:
	mkdir -p $@


.info-pandoc:
	@echo "-------- pandoc output --------"

pandoc: .info-pandoc /target/index.html
	@echo "-------- /pandoc output --------"
	@echo

/target/.meta/slides.combined.md.txt: $(wildcard /source/slide*.md)
	-rm -f $@
	touch $@
	if [ -n "$^" ]; then \
		for F in $^; do \
			markdown-pp --exclude latexrender $$F >> $@ ; \
			echo >> $@; \
		done; \
	else \
		cp /markdeck/note.md $@; \
	fi

/target/.meta/index.html: /target/.meta/slides.combined.md.txt /target/.meta/config.json /markdeck/defaults.yaml
	PANDOC_ARGS=; \
	[ -e /source/include-before-body ] && PANDOC_ARGS="$${PANDOC_ARGS} --include-before-body /source/include-before-body"; \
	[ -e /source/include-after-body ] && PANDOC_ARGS="$${PANDOC_ARGS} --include-after-body /source/include-after-body"; \
	variant="$$(jq -r '.variant' < /target/.meta/config.json)"; \
	pandoc \
		-f markdown+yaml_metadata_block \
		-t revealjs \
		--no-highlight \
		--wrap=preserve \
		--standalone \
		--template=/markdeck/template-$${variant}.html \
		--slide-level=2 \
		--section-divs \
		--lua-filter /markdeck/lib/skip-slide-filter.lua \
		--filter mathjax-pandoc-filter \
		--lua-filter /markdeck/lib/render-asciiart-filter.lua \
		--lua-filter /markdeck/lib/render-emojis-filter.lua \
		--lua-filter /markdeck/lib/bg-shortcut-filter.lua \
		--lua-filter /markdeck/lib/$${variant}-shortcut-filter.lua \
		--lua-filter /markdeck/lib/inline-svg.lua \
		--lua-filter /markdeck/lib/font-awesome.lua \
		$${PANDOC_ARGS} \
		-o $@ \
		$< /markdeck/defaults.yaml 2>&1 | tee /target/.meta/pandoc.output

/target/index.html: /target/.meta /target/.meta/index.html
	# clear rerendering styling
	echo "" > /target/assets/css/rerendering.css
	cp /target/.meta/index.html $@

.SECONDEXPANSION:
/target/assets/3rdparty/reveal.js/css/theme/%.css: $$(addsuffix /%.scss,/target/assets/3rdparty/reveal.js/css/theme/source)
	sassc $< $@

/target/assets/markdeck/css/%.css /target/assets/css/%.css: $$(subst .css,.scss,$$@)
	sassc $< $@

waitforchanges: $(wildcard /source/slide*.md) /source/assets $(wildcard /source/include-before-body) $(wildcard /source/include-after-body)
	# TODO currently inotify doesn't work on mounted volumes :-/
	inotifywait -e modify,create,delete,move,attrib -r $^


clean:
	rm -rf /target/.??* /target/*

.PHONY: all .info-all render .info-render sync .info-sync .rsync .rsync-sync .fc-list sass .info-sass .sync-custom-themes clean config .info-config pandoc .info-pandoc
