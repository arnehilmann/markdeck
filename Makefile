all:	md2deck/bin/pandoc md2deck/lib/plantuml.jar md2deck/lib/plantuml.jar md2deck/lib/ditaa.jar md2deck/lib/render-asciiart-filter.lua md2deck/assets/3rdparty/asciinema-player.js md2deck/assets/3rdparty/asciinema-player.css md2deck/assets/3rdparty/reveal.js
	docker build \
		--rm \
		--build-arg http_proxy=$(http_proxy) \
		--build-arg https_proxy=$(https_proxy) \
		-t arne/md2deck:latest \
		-t arne/md2deck:0.2 \
		.


md2deck/bin/pandoc:
	curl -L "https://github.com/jgm/pandoc/releases/download/2.0.2/pandoc-2.0.2-linux.tar.gz" | tar --strip-components=1 -C md2deck -zxvf - "pandoc-*/bin/pandoc"


md2deck/lib/plantuml.jar:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://sourceforge.net/projects/plantuml/files/plantuml.jar/download?use_mirror=10gbps-io"


md2deck/lib/ditaa.jar:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/arnehilmann/deck-master-md-reveal-pdf-cc/raw/master/ditaamini-0.11-SNAPSHOT.jar"


md2deck/lib/render-asciiart-filter.lua:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://raw.githubusercontent.com/arnehilmann/pandoc-asciiart-filter/master/render-asciiart-filter.lua"


md2deck/assets/3rdparty/asciinema-player.js:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/asciinema/asciinema-player/releases/download/v2.5.0/asciinema-player.js"


md2deck/assets/3rdparty/asciinema-player.css:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/asciinema/asciinema-player/releases/download/v2.5.0/asciinema-player.css"


md2deck/assets/3rdparty/reveal.js:
	mkdir -p $@
	curl -L "https://github.com/hakimel/reveal.js/archive/3.5.0.tar.gz" | tar -C $@ --strip-components=1 --exclude test -zxvf -
