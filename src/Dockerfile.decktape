FROM astefanutti/decktape:2.8.5

LABEL maintainer="arne@hilmann.de"

USER root
RUN apk add --update inotify-tools jq curl imagemagick && rm -rf /var/cache/apk/*
COPY markdeck/loop.decktape /usr/local/bin/loop.decktape
RUN ln -sf /slides /target
USER node

VOLUME /slides

ENTRYPOINT ["/usr/local/bin/loop.decktape"]
