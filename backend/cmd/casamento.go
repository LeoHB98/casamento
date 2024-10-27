package main

import (
	"log"

	"github.com/alpha_main/config"
	"github.com/alpha_main/database"
	"github.com/alpha_main/services"
	"github.com/alpha_main/start"
)

var version = "dev"

func main() {

	cfg, err := config.New(version == "dev")
	if err != nil {
		panic(err)
	}

	s, err := start.New(cfg)
	if err != nil {
		log.Fatalf("Database connection error - %v", err)
	}

	log.Println("Connection with database was successful!")
	log.Printf("Web-service alpha_manut_api - " + version)

	data := database.New(s.DbsConx, s.Util)
	sv := services.New(s, data)
	sv.Listener(8082, "")

}

// func main() {

// 	if err := run(context.Background()); err != nil {
// 		log.Fatal(err)
// 	}
// }

// func run(ctx context.Context) error {

// 	listener, err := ngrok.Listen(ctx,
// 		config.HTTPEndpoint(
// 			config.WithDomain("tight-lark-equal.ngrok-free.app"),
// 			config.WithOAuth("google",
// 				config.WithAllowOAuthEmail("leohenrique095@gmail.com"),
// 			),
// 		),
// 		ngrok.WithAuthtokenFromEnv(),
// 	)
// 	if err != nil {
// 		return err
// 	}

// 	log.Println("teste")

// 	log.Println("Ingress established at:", listener.URL())

// 	return http.Serve(listener, http.HandlerFunc(handler))
// }

// func handler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintln(w, "Hello from ngrok-go!")
// }
