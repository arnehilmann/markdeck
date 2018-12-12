PANDOC_VERSION=2.4
REVEALJS_VERSION=3.7.0
ASCIINEMAPLAYER_VERSION=v2.6.1
JQUERY_VERSION=3.3.1.slim.min
IMPRESSJS_VERSION=1.0.0
VERSION:=$$(yq r docker-compose.yaml services.markdeck.build.args.version)


all:	prepare
	docker-compose build


tag:	all
	@echo $(VERSION)
	git tag -a v$(VERSION) -m v$(VERSION)
	git push --tags


push:	all
	docker-compose push


prepare:	downloaded/bin/pandoc \
	markdeck/lib/plantuml.jar \
	markdeck/lib/plantuml.jar \
	markdeck/lib/ditaa.jar \
	markdeck/assets/3rdparty/asciinema-player.js \
	markdeck/assets/3rdparty/asciinema-player.css \
	markdeck/assets/3rdparty/reveal.js \
	markdeck/assets/3rdparty/impress.js \
	jqueryemoji \
	markdeck/helper/downloaded/trianglify-background-generator-master \
	markdeck/helper/downloaded/colorful-background \
	markdeck/helper/downloaded/gradient-generator \
	markdeck/helper/downloaded/unique-gradient-generator


downloaded/bin/pandoc:
	mkdir -p downloaded/bin
	curl -L "https://github.com/jgm/pandoc/releases/download/$(PANDOC_VERSION)/pandoc-$(PANDOC_VERSION)-linux.tar.gz" | tar --strip-components=1 -C downloaded -zxvf - "pandoc-*/bin/pandoc"


jqueryemoji:	jquery.js markdeck/lib/emojis


markdeck/lib/emojis:
	mkdir -p $@
	curl -L -o $@.zip https://github.com/rodrigopolo/jqueryemoji/archive/master.zip
	unzip $@.zip
	mv jqueryemoji-master/img/apple72/* $@
	rm -rf jqueryemoji-master $@.zip


jquery.js:	markdeck/assets/3rdparty/jquery.js


markdeck/assets/3rdparty/jquery.js:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ https://code.jquery.com/jquery-$(JQUERY_VERSION).js


markdeck/lib/plantuml.jar:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://sourceforge.net/projects/plantuml/files/plantuml.jar/download?use_mirror=10gbps-io"


markdeck/lib/ditaa.jar:
	# from https://github.com/pepijnve/ditaa/
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/arnehilmann/deck-master-md-reveal-pdf-cc/raw/master/ditaamini-0.11-SNAPSHOT.jar"


#markdeck/lib/render-asciiart-filter.lua:
	#mkdir -p $(shell dirname $@)
	#curl -L -o $@ "https://raw.githubusercontent.com/arnehilmann/pandoc-asciiart-filter/master/render-asciiart-filter.lua"


markdeck/assets/3rdparty/asciinema-player.js:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/asciinema/asciinema-player/releases/download/$(ASCIINEMAPLAYER_VERSION)/asciinema-player.js"
	touch $@.map


markdeck/assets/3rdparty/asciinema-player.css:
	mkdir -p $(shell dirname $@)
	curl -L -o $@ "https://github.com/asciinema/asciinema-player/releases/download/$(ASCIINEMAPLAYER_VERSION)/asciinema-player.css"


markdeck/assets/3rdparty/reveal.js:
	mkdir -p $@
	curl -L "https://github.com/hakimel/reveal.js/archive/$(REVEALJS_VERSION).tar.gz" | tar -C $@ --strip-components=1 --exclude test --exclude font -zxvf -


markdeck/assets/3rdparty/impress.js:
	mkdir -p $@
	curl -L "https://github.com/impress/impress.js/archive/$(IMPRESSJS_VERSION).tar.gz" | tar -C $@ --strip-components=1 --exclude examples --exclude test -zxvf -


markdeck/helper/downloaded/trianglify-background-generator-master:
	mkdir -p $(shell dirname $@)
	curl -O -L https://github.com/alssndro/trianglify-background-generator/archive/master.zip
	unzip -d $(shell dirname $@) master.zip
	rm -f master.zip


markdeck/helper/downloaded/colorful-background:
	mkdir -p $(shell dirname $@)
	wget -kr -np -nH http://www.webcore-it.com/colorful-background/
	mv colorful-background $@


markdeck/helper/downloaded/unique-gradient-generator:
	mkdir -p @$
	curl -L -O https://github.com/tiborsaas/unique-gradient-generator/archive/gh-pages.zip
	unzip gh-pages.zip
	rm -f gh-pages.zip
	mv unique-gradient-generator-gh-pages/ $@
	echo $@/img
	ls -al $@/img
	#for F in $$(find $@/img -size +100k); do BN=$@/img/$$(basename $$F .png); rm -fv $$BN.png $${BN}_thumb.png; done


markdeck/helper/downloaded/gradient-generator:
	mkdir -p $(shell dirname $@)
	wget -kr -np -nH https://tools.superdevresources.com/gradient-generator/
	mv gradient-generator/ $@


# https://raw.githubusercontent.com/neverpanic/google-font-download/master/google-font-download

clean:
	rm -f downloaded/bin/*
	rm -rf markdeck/assets/3rdparty
	git clean -fx


tabularasa:
	docker images arne/markdeck
	docker rmi arne/markdeck || :
	for I in $$(docker images -q arne/markdeck); do docker rmi $$I; done
	docker system prune -f
	docker images arne/markdeck

.PHONY: all prepare jquery.js jqueryemoji push tag clean tabularasa
