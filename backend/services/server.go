package services

import (
	"net/http"

	"github.com/go-chi/chi"
)

func (s *Service) Server(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("ngrok-skip-browser-warning", "true")
	http.ServeFile(w, r, "../../frontend/build/index.html")

}

func (s *Service) ServerFile(r *chi.Mux) {

	fs := http.FileServer(http.Dir("../../frontend/build"))
	r.Handle("/invite/*", http.StripPrefix("/invite", fs))

}
