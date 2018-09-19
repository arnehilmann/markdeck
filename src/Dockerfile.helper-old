FROM node:alpine
LABEL maintainer="arne@hilmann.de"

COPY markdeck/helper/ /www
WORKDIR /www

EXPOSE 8081
ENTRYPOINT /usr/sbin/httpd -f -p 8081
