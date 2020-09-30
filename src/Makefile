SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

.PHONY: all tag push check-versions clean tabularasa

PANDOC_VERSION=2.9.2.1
REVEALJS_VERSION=4.0.2
ASCIINEMAPLAYER_VERSION=v2.6.1
JQUERY_VERSION=3.5.1.slim.min
IMPRESSJS_VERSION=1.1.0
MERMAID_VERSION=8.8.0
SVGBOB_VERSION=0.5.0-alpha.6

VERSION=0.53.4
MOTTO='support jupyterlab'
WEB_VERSION=0.2
PDF_VERSION=0.10
STANDALONE_VERSION=0.5
FRIENDS_VERSION=0.5
A2SKETCH_VERSION=0.13


all:	docker-compose.yaml develop.yaml ../markdeck images.built


images.built: Makefile Dockerfile.* $(shell find markdeck/) markdeck/versions
	docker-compose build \
		--build-arg MERMAID_VERSION=$(MERMAID_VERSION) \
		--build-arg PANDOC_VERSION=$(PANDOC_VERSION) \
		--build-arg JQUERY_VERSION=$(JQUERY_VERSION) \
		--build-arg REVEALJS_VERSION=$(REVEALJS_VERSION) \
		--build-arg IMPRESSJS_VERSION=$(IMPRESSJS_VERSION) \
		--build-arg ASCIINEMAPLAYER_VERSION=$(ASCIINEMAPLAYER_VERSION) \
		--build-arg SVGBOB_VERSION=$(SVGBOB_VERSION)
	touch images.built


tag:	all
	@echo $(VERSION)
	git tag -a v$(VERSION) -m v$(VERSION)
	git push --tags


push:	all
	docker-compose push
	for I in $(shell yq r docker-compose.yaml 'services.*.image'); do
		docker tag $$I quay.io/$$I
		docker push quay.io/$$I
	done


docker-compose.yaml:	docker-compose.yaml.source Makefile
	cp docker-compose.yaml.source docker-compose.yaml
	yq w -i docker-compose.yaml services.markdeck.image "arne/markdeck-pandoc:$(VERSION)"
	yq w -i docker-compose.yaml services.markdeck.build.args.version "$(VERSION)"
	yq w -i docker-compose.yaml services.markdeck.build.args.motto "$(MOTTO)"
	yq w -i docker-compose.yaml services.web.image "arne/markdeck-liveserver:$(WEB_VERSION)"
	yq w -i docker-compose.yaml services.pdf.image "arne/markdeck-decktape:$(PDF_VERSION)"
	yq w -i docker-compose.yaml services.standalone.image "arne/markdeck-standalone:$(STANDALONE_VERSION)"
	yq w -i docker-compose.yaml services.friends.image "arne/markdown-friends:$(FRIENDS_VERSION)"
	yq w -i docker-compose.yaml services.a2sketch.image "arne/a2sketch:$(A2SKETCH_VERSION)"


develop.yaml:	develop.yaml.source Makefile
	cp develop.yaml.source develop.yaml
	yq w -i develop.yaml services.markdeck.image "arne/markdeck-pandoc:$(VERSION)"
	yq w -i develop.yaml services.web.image "arne/markdeck-liveserver:$(WEB_VERSION)"
	yq w -i develop.yaml services.pdf.image "arne/markdeck-decktape:$(PDF_VERSION)"
	yq w -i develop.yaml services.standalone.image "arne/markdeck-standalone:$(STANDALONE_VERSION)"
	yq w -i develop.yaml services.friends.image "arne/markdown-friends:$(FRIENDS_VERSION)"
	yq w -i develop.yaml services.a2sketch.image "arne/a2sketch:$(A2SKETCH_VERSION)"


../markdeck:	docker-compose.yaml Makefile
	sed -n '/EODCF/,/EODCF/{/EODCF/d;s/..MARKDECK_USER/______/;p;}' ../markdeck > dc.tmp
	yq w -i dc.tmp services.markdeck.image "arne/markdeck-pandoc:$(VERSION)"
	yq w -i dc.tmp services.markdeck.build.args.version "$(VERSION)"
	yq d -i dc.tmp services.markdeck.build
	yq w -i dc.tmp services.web.image "arne/markdeck-liveserver:$(WEB_VERSION)"
	yq d -i dc.tmp services.web.build
	yq w -i dc.tmp services.pdf.image "arne/markdeck-decktape:$(PDF_VERSION)"
	yq d -i dc.tmp services.pdf.build
	yq w -i dc.tmp services.standalone.image "arne/markdeck-standalone:$(STANDALONE_VERSION)"
	yq d -i dc.tmp services.standalone.build
	yq w -i dc.tmp services.friends.image "arne/markdown-friends:$(FRIENDS_VERSION)"
	yq d -i dc.tmp services.friends.build
	yq w -i dc.tmp services.a2sketch.image "arne/a2sketch:$(A2SKETCH_VERSION)"
	sed -i.bak 's/______/\\$$MARKDECK_USER/' dc.tmp
	sed -i.bak -e '/ EODCF/r dc.tmp' -e '/ EODCF/,/EODCF/{/EODCF/p;d;}' ../markdeck
	rm -f dc.tmp* ../markdeck.bak
	sed -i.bak '/VERSION=/{s/=.*/=$(VERSION)/;}' ../markdeck
	rm -f ../markdeck.bak


check-versions:
	@echo "PANDOC_VERSION"
	@echo "$(PANDOC_VERSION)"
	@curl -s https://github.com/jgm/pandoc/releases/latest  | sed 's_.*/releases/tag/__;s/">.*//'
	@echo
	@echo "REVEALJS_VERSION"
	@echo "$(REVEALJS_VERSION)"
	@curl -s https://github.com/hakimel/reveal.js/releases/latest  | sed 's_.*/releases/tag/__;s/">.*//'
	@echo
	@echo "ASCIINEMAPLAYER_VERSION"
	@echo "$(ASCIINEMAPLAYER_VERSION)"
	@curl -s https://github.com/asciinema/asciinema-player/releases/latest | sed 's_.*/releases/tag/__;s/">.*//'
	@echo
	@echo "JQUERY_VERSION"
	@echo "$(JQUERY_VERSION)"
	@echo ?
	@echo
	@echo "IMPRESSJS_VERSION"
	@echo "$(IMPRESSJS_VERSION)"
	@curl -s https://github.com/impress/impress.js/releases/latest | sed 's_.*/releases/tag/__;s/">.*//'
	@echo
	@echo "MERMAID_VERSION"
	@echo "$(MERMAID_VERSION)"
	@curl -s https://github.com/mermaid-js/mermaid/releases/latest | sed 's_.*/releases/tag/__;s/">.*//'
	@echo
	@echo "SVGBOB_VERSION"
	@echo "$(SVGBOB_VERSION)"
	@echo ?
	@echo


markdeck/versions:	Makefile
	rm -f $@
	echo "PANDOC_VERSION=$(PANDOC_VERSION)" >> $@
	echo "REVEALJS_VERSION=$(REVEALJS_VERSION)" >> $@
	echo "ASCIINEMAPLAYER_VERSION=$(ASCIINEMAPLAYER_VERSION)" >> $@
	echo "JQUERY_VERSION=$(JQUERY_VERSION)" >> $@
	echo "IMPRESSJS_VERSION=$(IMPRESSJS_VERSION)" >> $@
	echo "MERMAID_VERSION=$(MERMAID_VERSION)" >> $@
	echo "SVGBOB_VERSION=$(SVGBOB_VERSION)" >> $@


clean:
	rm -f downloaded/bin/*
	rm -rf markdeck/assets/3rdparty markdeck/assets/framework
	git clean -fx


tabularasa:
	docker images "arne/markdeck*"
	docker images -q "arne/markdeck*" | xargs docker rmi -f
	docker system prune -f
	docker images "arne/markdeck*"
