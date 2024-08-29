package services

import (
	"encoding/json"
	"net/http"

	"github.com/alpha_main/models"
	"github.com/alpha_main/tools"
)

func (s *Service) GetAllMembers(w http.ResponseWriter, r *http.Request) {

	data := []models.CompiledMembers{}
	var err error

	defer func() {

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		code := http.StatusOK
		if err != nil {
			code = http.StatusInternalServerError
		}
		w.WriteHeader(code)

		err := json.NewEncoder(w).Encode(data)
		if err != nil {
			panic(err)
		}
	}()

	sqlOp := `
	select 
	  f.id,
	  f.codigo,
	  f.nome_familia,
	  f.data_confirmacao,
	  f.data_criacao
	from familia f  
	order by f.data_criacao desc`

	db := s.DB[0]
	tools.CheckErr(err)

	err = db.Select(&data, sqlOp)
	tools.CheckErr(err)

	for i := 0; i < len(data); i++ {

		sqlOp := `
		select
		  fm.nome_membro,
		  fm.data_atualizacao,
		  fm.confirmado 
		from familia_membros fm
		  inner join familia f on f.id = fm.familia_id
		  where fm.familia_id = $1`

		err = db.Select(&data[i].NomeMembros, sqlOp, data[i].Id)

		for j := 0; j < len(data[i].NomeMembros); j++ {

			stage := tools.ToPrt("Não")

			if data[i].NomeMembros[j].Confirmado != nil {

				if *data[i].NomeMembros[j].Confirmado == "S" {
					*stage = "Sim"
				}
			}

			data[i].NomeMembros[j].Confirmado = stage

		}
		tools.CheckErr(err)

	}
}

func (s *Service) GetMembersConfirmed(w http.ResponseWriter, r *http.Request) {}
