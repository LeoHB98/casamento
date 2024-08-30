package services

import (
	"encoding/json"
	"net/http"
)

func (s *Service) Responser(w http.ResponseWriter, codeHttp int, data interface{}) {

	var err error

	defer func() {
		if err != nil {
			panic(err)
		}
	}()

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	w.WriteHeader(codeHttp)
	err = json.NewEncoder(w).Encode(data)

}
