package services

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/alpha_main/tools"
)

func (s *Service) UpdateConfirmationMember(w http.ResponseWriter, r *http.Request) {

	type Response struct {
		Response string `json:"response"`
	}
	type members struct {
		Code    string   `json:"code"`
		Members []string `json:"members"`
	}

	m := members{}
	txx, err := s.DB[0].Beginx()
	tools.CheckErr(err)

	defer func() {

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		code := http.StatusOK
		mgm := "Atualizacao de membros realizada"

		if m.Code == "" {
			code = http.StatusBadRequest
			mgm = "Codigo vazio"
		}

		w.WriteHeader(code)

		err := json.NewEncoder(w).Encode(Response{
			Response: mgm,
		})
		tools.CheckErr(err)

	}()

	err = json.NewDecoder(r.Body).Decode(&m)
	tools.CheckErr(err)

	timeNow := time.Now().Format("2006-01-02 15:04:05")

	_, err = txx.Exec("update familia set data_confirmacao = $1 where codigo = $2", timeNow, m.Code)
	tools.CheckErr(err)

	sqlOp := `
	select
 	  fm.nome_membro 
	from familia_membros fm
	  inner join familia f on fm.familia_id = f.id 
	where f.codigo = $1
	order by fm.nome_membro asc`

	allMembers := []string{}
	err = txx.Select(&allMembers, sqlOp, m.Code)
	tools.CheckErr(err)

	membersSelected := make(map[string]string)

	for _, member := range m.Members {

		for _, mb := range allMembers {
			membersSelected[mb] = "N"

			if member == mb {
				membersSelected[member] = "S"
			}
		}

	}

	for member, value := range membersSelected {

		_, err = txx.Exec(`
			update
			 familia_membros
			set
			 data_atualizacao = $1,
			 confirmado = $2
			 where nome_membro = $3`, timeNow, value, member)
		tools.CheckErr(err)
	}

	tools.CheckErr(txx.Commit())

}
