FROM fedora
LABEL maintainer="arne@hilmann.de"

RUN dnf install -y java-1.8.0-openjdk graphviz inotify-tools npm rsync && dnf clean all
RUN npm install -g live-server
EXPOSE 8080

VOLUME ["/source/", "/target/"]

RUN mkdir -p /md2deck/
COPY md2deck/ /md2deck/

WORKDIR /md2deck

CMD ["/md2deck/loop"]
