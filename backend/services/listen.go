package services

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/go-chi/chi"
)

var authorization string

func (s *Service) Listener(port int, auth string) {
	router := chi.NewRouter()

	router.Route("/", func(r chi.Router) {
		// r.Use(Middleware)
		r.Get("/familia/{id}", s.GetFamilyLastName)
	})

	log.Printf("Listening at port: %v", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), router))
}

func Middleware(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		auth := strings.ToLower(r.Header.Get("Authorization"))
		contentType := strings.ToLower(r.Header.Get("Content-Type"))

		if auth != authorization {
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(`{ "errors": "401", "message": "invalid authorization" }`))
			return
		}

		if !strings.Contains(contentType, "application/json") {
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(`{ "response": "400", "message": "wrong content type, should be application/json" }`))
			return
		}

		next.ServeHTTP(w, r)
	})
}
