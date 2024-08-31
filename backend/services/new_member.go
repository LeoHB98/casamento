package services

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/alpha_main/database"
	"github.com/alpha_main/models"
	"github.com/alpha_main/tools"
)

func (s *Service) PostNewMember(w http.ResponseWriter, r *http.Request) {

	membersStorage := models.CompiledMembers{}
	var err error
	resp := models.GenericResponse{}

	defer func() {
		resp.Code = http.StatusOK
		resp.Message = "Cadastro efetuado com sucesso"

		if err != nil {
			resp.Code = http.StatusInternalServerError
			resp.Message = "Erro servidor"

			defer func() {
				tools.CheckErr(err)
			}()
		}

		s.Responser(w, resp.Code, resp)
	}()

	err = json.NewDecoder(r.Body).Decode(&membersStorage)
	if err != nil {
		return
	}

	// db := tools.ConnectPostgres(&config.DbConfigPostgres{
	// 	DbName:   "mydatabase",
	// 	Password: "leoPost1234",
	// 	User:     "leonardo",
	// })
	// defer db.Close()

	txx, err := s.DB[0].Beginx()
	if err != nil {
		return
	}

	log.Println(string(tools.Marshller(membersStorage)))

	if err = database.InsertNewMembers([]models.CompiledMembers{membersStorage}, txx); err != nil {
		return
	}

}
