VERSION=0.8


PANDOC_VERSION=2.0.3
REVEALJS_VERSION=3.5.0
IMPRESSJS_VERSION=1.0.0-beta1
ASCIINEMAPLAYER_VERSION=v2.6.0

all:	markdeck/bin/pandoc markdeck/lib/plantuml.jar markdeck/lib/plantuml.jar markdeck/lib/ditaa.jar markdeck/lib/render-asciiart-filter.lua markdeck/assets/3rdparty/asciinema-player.js markdeck/assets/3rdparty/asciinema-player.css markdeck/assets/3rdparty/reveal.js markdeck/assets/3rdparty/impress.js
	docker build \
		--rm \
		--build-arg http_proxy=$(http_proxy) \
		--build-arg https_proxy=$(https_proxy) \
		-t arne/markdeck:latest \
		-t arne/markdeck:$(VERSION) \
		.


tag:	all
	git tag -a v$(VERSION) -m v$(VERSION)
	git push --tags


push:	all
	docker push arne/markdeck:$(VERSION)
	docker push arne/markdeck:latest


markdeck/bin/pandoc:
	curl -L "https://github.com/jgm/pandoc/releases/download/$(PANDOC_VERSION)/pandoc-$(PANDOC_VERSION)-linux.tar.gz" | tar --strip-components=1 -C markdeck -zxvf - "pandoc-*/bin/pandoc"


markdeck/lib/plantuml.jar:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://sourceforge.net/projects/plantuml/files/plantuml.jar/download?use_mirror=10gbps-io"


markdeck/lib/ditaa.jar:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/arnehilmann/deck-master-md-reveal-pdf-cc/raw/master/ditaamini-0.11-SNAPSHOT.jar"


markdeck/lib/render-asciiart-filter.lua:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://raw.githubusercontent.com/arnehilmann/pandoc-asciiart-filter/master/render-asciiart-filter.lua"


markdeck/assets/3rdparty/asciinema-player.js:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/asciinema/asciinema-player/releases/download/$(ASCIINEMAPLAYER_VERSION)/asciinema-player.js"


markdeck/assets/3rdparty/asciinema-player.css:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/asciinema/asciinema-player/releases/download/$(ASCIINEMAPLAYER_VERSION)/asciinema-player.css"


markdeck/assets/3rdparty/reveal.js:
	mkdir -p $@
	curl -L "https://github.com/hakimel/reveal.js/archive/$(REVEALJS_VERSION).tar.gz" | tar -C $@ --strip-components=1 --exclude test --exclude font -zxvf -


markdeck/assets/3rdparty/impress.js:
	mkdir -p $@
	curl -L "https://github.com/impress/impress.js/archive/$(IMPRESSJS_VERSION).tar.gz" | tar -C $@ --strip-components=1 --exclude test --exclude examples -zxvf -


clean:
	rm -f markdeck/bin/*
	rm -rf markdeck/assets/
	git clean -fx


.PHONY: all push clean tag
