FROM fedora
LABEL maintainer="arne@hilmann.de"

RUN dnf install -y java-1.8.0-openjdk graphviz inotify-tools npm rsync && dnf clean all

VOLUME ["/source/", "/target/"]

WORKDIR /
RUN curl -L "https://github.com/jgm/pandoc/releases/download/2.0.2/pandoc-2.0.2-linux.tar.gz" | tar --strip-components=1 -zxvf - "pandoc-*/bin/pandoc"

RUN mkdir -p /md2deck/lib
WORKDIR /md2deck/lib
RUN curl -L "https://sourceforge.net/projects/plantuml/files/plantuml.jar/download?use_mirror=10gbps-io" > plantuml.jar
RUN curl -L "https://github.com/arnehilmann/deck-master-md-reveal-pdf-cc/raw/master/ditaamini-0.11-SNAPSHOT.jar" > ditaa.jar
RUN curl -L -O "https://raw.githubusercontent.com/arnehilmann/pandoc-asciiart-filter/master/render-asciiart-filter.lua"

RUN mkdir -p /md2deck/assets/3rdparty
WORKDIR /md2deck/assets/3rdparty
RUN curl -L -O "https://github.com/asciinema/asciinema-player/releases/download/v2.5.0/asciinema-player.js"
RUN curl -L -O "https://github.com/asciinema/asciinema-player/releases/download/v2.5.0/asciinema-player.css"
RUN curl -L "https://github.com/hakimel/reveal.js/archive/3.5.0.tar.gz" | tar -zxvf -
RUN mv reveal.js-* reveal.js

WORKDIR /md2deck
RUN npm install -g live-server
EXPOSE 8080
COPY md2deck/* ./

ENTRYPOINT ["/md2deck/loop"]
