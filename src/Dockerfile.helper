FROM golang:alpine as builder

RUN apk add git
RUN go get github.com/rakyll/statik

WORKDIR /

COPY markdeck/helper /helper
RUN statik -src=/helper
RUN ls -al

RUN cp /helper/main.go /main.go

RUN mkdir /build
RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o /build/helper .


FROM scratch

LABEL maintainer="arne@hilmann.de"

COPY --from=builder /build/helper /helper
EXPOSE 8081
CMD ["/helper"]
