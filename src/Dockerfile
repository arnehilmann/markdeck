FROM fedora:27
LABEL maintainer="arne@hilmann.de"

RUN dnf install --nodocs -y \
    java-1.8.0-openjdk graphviz inotify-tools npm rsync \
    qrencode procps-ng jq rubygem-sass zip \
    && dnf clean all
RUN dnf install --nodocs -y \
    chromium-libs ipa-gothic-fonts xorg-x11-fonts-100dpi \
    xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic \
    xorg-x11-fonts-misc \
    && dnf clean all
RUN dnf install --nodocs -y \
    less tmux \
    && dnf clean all
RUN npm install -g --unsafe-perm decktape && npm cache clean --force
RUN npm install -g live-server && npm cache clean --force
RUN npm install -g vega vega-lite && npm cache clean --force
RUN npm install -g mathjax-pandoc-filter && npm cache clean --force
EXPOSE 8080 8081

VOLUME ["/source/", "/target/"]

COPY downloaded/ /usr/
RUN mkdir -p /markdeck/
COPY markdeck/ /markdeck/
WORKDIR /markdeck

ARG VERSION
ENV VERSION $VERSION

ARG MOTTO
ENV MOTTO $MOTTO

ENTRYPOINT ["/markdeck/loop"]
