FROM fedora:27
LABEL maintainer="arne@hilmann.de"

RUN dnf install -y java-1.8.0-openjdk graphviz inotify-tools npm rsync qrencode procps-ng && dnf clean all
RUN npm install -g live-server
EXPOSE 8080

VOLUME ["/source/", "/target/"]

RUN mkdir -p /markdeck/
COPY markdeck/ /markdeck/

WORKDIR /markdeck

ENTRYPOINT ["/markdeck/loop"]
