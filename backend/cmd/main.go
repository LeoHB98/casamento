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
