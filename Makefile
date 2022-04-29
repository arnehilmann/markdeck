SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

.PHONY: all tag push check-versions clean tabularasa docroot

PANDOC_VERSION=2.18
REVEALJS_VERSION=4.3.1
ASCIINEMAPLAYER_VERSION=v2.6.1
JQUERY_VERSION=3.6.0.slim.min
IMPRESSJS_VERSION=1.1.0
MERMAID_VERSION=9.0.0
SVGBOB_VERSION=0.5.0-alpha.6

VERSION=0.60.0
MOTTO=rusty version
PDF_VERSION=0.11
STANDALONE_VERSION=0.5
FRIENDS_VERSION=0.5
A2SKETCH_VERSION=0.15
JUPYTER_VERSION=0.4


# all:	docroot pandocs
.PHONY: all target/binaries/markdeck.x86_64-apple-darwin target/binaries/markdeck.x86_64-unknown-linux-musl
all:	docroot pandocs binaries docker-image

debug:
	time cargo build

pandocs: src/docroot/pandoc-x86_64-apple-darwin src/docroot/pandoc-x86_64-unknown-linux-musl

src/docroot/pandoc-x86_64-apple-darwin:
	curl -OL https://github.com/jgm/pandoc/releases/download/$(PANDOC_VERSION)/pandoc-$(PANDOC_VERSION)-macOS.zip
	unzip -p pandoc-$(PANDOC_VERSION)-macOS.zip pandoc-$(PANDOC_VERSION)/bin/pandoc > $@
	chmod a+rx $@
	rm -f pandoc-$(PANDOC_VERSION)-macOS.zip

src/docroot/pandoc-x86_64-unknown-linux-musl:
	curl -OL https://github.com/jgm/pandoc/releases/download/$(PANDOC_VERSION)/pandoc-$(PANDOC_VERSION)-linux-amd64.tar.gz
	tar zxvOf pandoc-$(PANDOC_VERSION)-linux-amd64.tar.gz  pandoc-$(PANDOC_VERSION)/bin/pandoc > $@
	chmod a+rx $@
	rm -f pandoc-$(PANDOC_VERSION)-linux-amd64.tar.gz

binaries: target/binaries/markdeck.x86_64-apple-darwin target/binaries/markdeck.x86_64-unknown-linux-musl

target/binaries/markdeck.x86_64-apple-darwin:
	export TARGET=x86_64-apple-darwin
	time cargo build --release --target $${TARGET}
	mkdir -p target/binaries
	cp target/$${TARGET}/release/markdeck $@

target/binaries/markdeck.x86_64-unknown-linux-musl:
	export CC_x86_64_unknown_linux_musl=x86_64-unknown-linux-musl-gcc
	export CXX_x86_64_unknown_linux_musl=x86_64-unknown-linux-musl-g++
	export AR_x86_64_unknown_linux_musl=x86_64-unknown-linux-musl-ar
	export CARGO_TARGET_X86_64_UNKNOWN_LINUX_MUSL_LINKER=x86_64-unknown-linux-musl-gcc
	export TARGET=x86_64-unknown-linux-musl
	time cargo build --release --target $${TARGET}
	mkdir -p target/binaries
	cp target/$${TARGET}/release/markdeck $@



docker-image:
	docker build -f docker/Dockerfile.markdeck target/binaries -t arne/markdeck:0.60.0

run-as-container:
	mkdir -p example/test
	# docker run -it -v $(PWD)/example/:/source:ro -v $(PWD)/example/test/:/target -p 8080:8080 markdeck:0.60.0
	docker rm -f markdeck
	docker run -it -v $(PWD)/example/:/source:ro -p 8080:8080 -e RUST_LOG=debug --name markdeck markdeck:0.60.0

debug-container:
	docker exec -it markdeck ash



# all:	docker-compose.yaml develop.yaml images.built


images.built: Makefile docker/Dockerfile.*
	cp target/binaries/markdeck.x86_64-unknown-linux-musl ./
	docker compose build \
		--no-rm --progress plain \
		--build-arg MERMAID_VERSION=$(MERMAID_VERSION) \
		--build-arg PANDOC_VERSION=$(PANDOC_VERSION) \
		--build-arg JQUERY_VERSION=$(JQUERY_VERSION) \
		--build-arg REVEALJS_VERSION=$(REVEALJS_VERSION) \
		--build-arg IMPRESSJS_VERSION=$(IMPRESSJS_VERSION) \
		--build-arg ASCIINEMAPLAYER_VERSION=$(ASCIINEMAPLAYER_VERSION) \
		--build-arg SVGBOB_VERSION=$(SVGBOB_VERSION)
	touch images.built


src/docroot/main/assets/3rdparty/jspdf/jspdf.umd.min.js:
	mkdir -p $(shell dirname $@)
	curl -Lo $@ https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js

src/docroot/main/toplevel/admin.html:	src/docroot/main/admin.template target/versions
	export $(shell cat target/versions | xargs)
	envsubst < $< > $@


docroot:	src/docroot/main/toplevel/admin.html src/docroot/main/assets/3rdparty/jspdf/jspdf.umd.min.js
	docker build -t arne/markdeck-docroot:latest -f docker/Dockerfile.docroot \
		--build-arg MERMAID_VERSION=$(MERMAID_VERSION) \
		--build-arg PANDOC_VERSION=$(PANDOC_VERSION) \
		--build-arg JQUERY_VERSION=$(JQUERY_VERSION) \
		--build-arg REVEALJS_VERSION=$(REVEALJS_VERSION) \
		--build-arg IMPRESSJS_VERSION=$(IMPRESSJS_VERSION) \
		--build-arg ASCIINEMAPLAYER_VERSION=$(ASCIINEMAPLAYER_VERSION) \
		--build-arg SVGBOB_VERSION=$(SVGBOB_VERSION) \
		--target build-docroot \
		.
	# docker scan arne/markdeck-docroot:latest
	rm -rf docroot/main
	mkdir -p src/docroot/main
	docker rm -f docroot-main
	docker create --name=docroot-main arne/markdeck-docroot:latest foo
	docker export docroot-main | tar -C src/docroot/main --strip-components 1 -x markdeck/
	docker rm docroot-main

	docker build -t arne/markdown-friends-docroot:latest \
		-f ../markdown-friends/Dockerfile \
		--target build-docroot \
		../markdown-friends
	# docker scan arne/markdown-friends-docroot:latest
	rm -rf docroot/live_server/helper
	mkdir -p src/docroot/live_server/helper
	docker rm -f docroot-helper
	docker create --name=docroot-helper arne/markdown-friends-docroot:latest foo
	docker export docroot-helper | tar -C src/docroot/live_server/helper --strip-components 1 -x docroot/


tag:	all
	@echo $(VERSION)
	git tag -a v$(VERSION) -m v$(VERSION)
	git push --tags


push:	all
	for I in $(shell yq r docker-compose.yaml 'services.*.image' | uniq); do
		echo pushing $$I
		docker push $$I
		docker tag $$I quay.io/$$I
		docker push quay.io/$$I
	done


docker-compose.yaml:	docker-compose.yaml.source Makefile
	cp docker-compose.yaml.source docker-compose.yaml
	yq eval '.services.markdeck.image = "arne/markdeck-pandoc:$(VERSION)"' -i docker-compose.yaml
	yq eval '.services.markdeck.build.args.version = "$(VERSION)"' -i docker-compose.yaml
	yq eval '.services.markdeck.build.args.motto = "$(MOTTO)"' -i docker-compose.yaml
	yq eval '.services.pdf.image = "arne/markdeck-decktape:$(PDF_VERSION)"' -i docker-compose.yaml
	yq eval '.services.standalone.image = "arne/markdeck-standalone:$(STANDALONE_VERSION)"' -i docker-compose.yaml
	yq eval '.services.friends.image = "arne/markdown-friends:$(FRIENDS_VERSION)"' -i docker-compose.yaml
	yq eval '.services.a2sketch.image = "arne/a2sketch:$(A2SKETCH_VERSION)"' -i docker-compose.yaml
	yq eval '.services.jupyter.image = "arne/markdeck-jupyter:$(JUPYTER_VERSION)"' -i docker-compose.yaml
	yq eval '.services.jupyterlab.image = "arne/markdeck-jupyter:$(JUPYTER_VERSION)"' -i docker-compose.yaml


develop.yaml:	develop.yaml.source Makefile
	cp develop.yaml.source develop.yaml
	yq eval '.services.markdeck.image = "arne/markdeck-pandoc:$(VERSION)"' -i docker-compose.yaml
	yq eval '.services.pdf.image = "arne/markdeck-decktape:$(PDF_VERSION)"' -i docker-compose.yaml
	yq eval '.services.standalone.image = "arne/markdeck-standalone:$(STANDALONE_VERSION)"' -i docker-compose.yaml
	yq eval '.services.friends.image = "arne/markdown-friends:$(FRIENDS_VERSION)"' -i docker-compose.yaml
	yq eval '.services.a2sketch.image = "arne/a2sketch:$(A2SKETCH_VERSION)"' -i docker-compose.yaml
	yq eval '.services.jupyter.image = "arne/markdeck-jupyter:$(JUPYTER_VERSION)"' -i docker-compose.yaml
	yq eval '.services.jupyterlab.image = "arne/markdeck-jupyter:$(JUPYTER_VERSION)"' -i docker-compose.yaml


../markdeck:	docker-compose.yaml Makefile
	sed -n '/EODCF/,/EODCF/{/EODCF/d;s/..MARKDECK_USER/______/;p;}' ../markdeck > dc.tmp
	yq eval '.services.markdeck.image = "arne/markdeck-pandoc:$(VERSION)"' -i dc.tmp
	yq eval '.services.markdeck.build.args.version = "$(VERSION)"' -i dc.tmp
	yq eval 'del(.services.markdeck.build)' -i dc.tmp
	yq eval 'del(.services.web.build)' -i dc.tmp
	yq eval '.services.pdf.image = "arne/markdeck-decktape:$(PDF_VERSION)"' -i dc.tmp
	yq eval 'del(.services.pdf.build)' -i dc.tmp
	yq eval '.services.standalone.image = "arne/markdeck-standalone:$(STANDALONE_VERSION)"' -i dc.tmp
	yq eval 'del(.services.standalone.build)' -i dc.tmp
	yq eval '.services.friends.image = "arne/markdown-friends:$(FRIENDS_VERSION)"' -i dc.tmp
	yq eval 'del(.services.friends.build)' -i dc.tmp
	yq eval '.services.a2sketch.image = "arne/a2sketch:$(A2SKETCH_VERSION)"' -i dc.tmp
	yq eval 'del(.services.jupyter.build)' -i dc.tmp
	yq eval '.services.jupyter.image = "arne/markdeck-jupyter:$(JUPYTER_VERSION)"' -i dc.tmp
	yq eval 'del(.services.jupyterlab.build)' -i dc.tmp
	yq eval '.services.jupyterlab.image = "arne/markdeck-jupyter:$(JUPYTER_VERSION)"' -i dc.tmp
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


target/versions:	Makefile
	rm -f $@
	echo "MARKDECK_VERSION=$(VERSION)" >> $@
	echo "PANDOC_VERSION=$(PANDOC_VERSION)" >> $@
	echo "REVEALJS_VERSION=$(REVEALJS_VERSION)" >> $@
	echo "ASCIINEMAPLAYER_VERSION=$(ASCIINEMAPLAYER_VERSION)" >> $@
	echo "JQUERY_VERSION=$(JQUERY_VERSION)" >> $@
	echo "IMPRESSJS_VERSION=$(IMPRESSJS_VERSION)" >> $@
	echo "MERMAID_VERSION=$(MERMAID_VERSION)" >> $@
	echo "SVGBOB_VERSION=$(SVGBOB_VERSION)" >> $@

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
