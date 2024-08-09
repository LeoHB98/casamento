package services

import (
	"net/http"
)

func (s *Service) Server(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../../frontend/dist/index.html")
}
