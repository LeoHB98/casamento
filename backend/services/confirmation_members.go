package services

import (
	"encoding/json"
	"net/http"
	"time"
)

func (s *Service) UpdateConfirmationMember(w http.ResponseWriter, r *http.Request) {

	type Response struct {
		Response string `json:"response"`
	}

	members := []string{}

	err := json.NewDecoder(r.Body).Decode(&members)
	if err != nil {
		panic(err)
	}

	timeNow := time.Now().Format("2006-01-02 15:04:05")

	_, err = s.DB[0].Exec("update familia set data_confirmacao = $1", timeNow)
	if err != nil {
		panic(err)
	}

	for _, member := range members {
		_, err = s.DB[0].Exec("update familia_membros set data_atualizacao = $1 where nome_membro = $2", timeNow, member)
		if err != nil {
			panic(err)
		}
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	w.WriteHeader(http.StatusOK)

	err = json.NewEncoder(w).Encode(Response{
		Response: "Atualizacao de membros realizada",
	})
	if err != nil {
		panic(err)
	}

}
