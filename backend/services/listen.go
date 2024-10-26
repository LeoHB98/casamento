package services

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

//var authorization string

func (s *Service) Listener(port int, auth string) {
	router := chi.NewRouter()

	// CORS settings
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"}, // Altere para o domínio que precisa de acesso
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"*"},
		AllowCredentials: false,
		MaxAge:           300, // Preflight request cache duration in seconds
	}))

	// //Disponibiliza a rota
	// router.Get("/invite", s.Server)

	// // //Disponibiliza o arquivo para a rota
	// s.ServerFile(router)

	router.Route("/", func(r chi.Router) {

		r.Use(Middleware)

		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(`{"status":"api ok"}`))
		})

		r.Get("/login", s.Login)

		r.Route("/membros", func(rrr chi.Router) {

			rrr.Use(Middleware)

			rrr.Get("/{code}", s.GetFamilyLastName)
			rrr.Get("/cadastrados", s.GetAllMembers)
			rrr.Get("/confirmados", s.GetMembersConfirmed)

			rrr.Post("/confirmar", s.UpdateConfirmationMember)
			rrr.Post("/cadastrar", s.PostNewMember)

			rrr.Delete("/{code}", s.DeleteMember)

			rrr.Get("/count", s.GetCountMembers)
		})

	})

	log.Printf("Listening at port: %v", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), router))

}

func Middleware(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// auth := strings.ToLower(r.Header.Get("Authorization"))
		// contentType := strings.ToLower(r.Header.Get("Content-Type"))

		// if auth != authorization {
		// 	w.Header().Set("Content-Type", "application/json; charset=utf-8")
		// 	w.WriteHeader(http.StatusUnauthorized)
		// 	w.Write([]byte(`{ "errors": "401", "message": "invalid authorization" }`))
		// 	return
		// }

		// if !strings.Contains(contentType, "application/json") {
		// 	w.Header().Set("Content-Type", "application/json; charset=utf-8")
		// 	w.WriteHeader(http.StatusBadRequest)
		// 	w.Write([]byte(`{ "response": "400", "message": "wrong content type, should be application/json" }`))
		// 	return
		// }

		log.Println(r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
