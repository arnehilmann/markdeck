FROM fedora:27
LABEL maintainer="arne@hilmann.de"

RUN dnf install --nodocs -y \
    java-1.8.0-openjdk graphviz inotify-tools npm rsync \
    qrencode procps-ng \
    && dnf clean all
RUN dnf install --nodocs -y \
    chromium-libs ipa-gothic-fonts xorg-x11-fonts-100dpi \
    xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic \
    xorg-x11-fonts-misc \
    && dnf clean all
RUN npm install -g decktape liveserver --unsafe-perm && npm cache clean --force
EXPOSE 8080 8081

VOLUME ["/source/", "/target/"]

RUN mkdir -p /markdeck/
COPY markdeck/ /markdeck/
WORKDIR /markdeck

ENTRYPOINT ["/markdeck/loop"]
