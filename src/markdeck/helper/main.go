package main

import (
	"log"
	"net/http"

	"github.com/rakyll/statik/fs"

	_ "./statik" // TODO: Replace with the absolute import path
)

func main() {
	statikFS, err := fs.New()
	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/", http.StripPrefix("/", http.FileServer(statikFS)))
	http.ListenAndServe(":8081", nil)
}
