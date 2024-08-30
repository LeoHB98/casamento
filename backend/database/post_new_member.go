package database

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/alpha_main/models"
	"github.com/alpha_main/tools"
	"github.com/jmoiron/sqlx"
)

func (s *DAO) PostNewMember(w http.ResponseWriter, r *http.Request) {

	membersStorage := models.CompiledMembers{}

	err := json.NewDecoder(r.Body).Decode(&membersStorage)
	tools.CheckErr(err)

	// db := tools.ConnectPostgres(&config.DbConfigPostgres{
	// 	DbName:   "mydatabase",
	// 	Password: "leoPost1234",
	// 	User:     "leonardo",
	// })
	// defer db.Close()

	txx, err := s.DB[0].Beginx()
	tools.CheckErr(err)

	if err := InsertNewMembers([]models.CompiledMembers{membersStorage}, txx); err != nil {
		tools.CheckErr(err)
	}
}

func InsertNewMembers(membersStorage []models.CompiledMembers, txx *sqlx.Tx) error {

	for _, members := range membersStorage {

		if members.NomeFamilia == nil {
			continue
		}

		err := txx.Get(&members.Id, "select max(id)+1 id from familia f")
		tools.CheckErr(err)

		if members.Id == nil {
			members.Id = tools.ToPrt(1)
		}

		radomKey, err := tools.GenerateRandomKey(3)
		tools.CheckErr(err)

		query := "insert into familia(id,codigo,nome_familia, data_criacao) values($1,$2,$3,$4)"

		timeNow := time.Now().Format("2006-01-02 15:04:05")

		_, err = txx.Exec(txx.Rebind(query), members.Id, radomKey, tools.CleanString(*members.NomeFamilia), timeNow)
		tools.CheckErr(err)

		for _, nome := range members.NomeMembros {

			nome.NomeMembro = tools.ToPrt(tools.CleanString(*nome.NomeMembro))

			if nome.NomeMembro == nil {
				continue
			}

			err := txx.Get(&nome.Id, "select max(id)+1 id from familia_membros fm")
			tools.CheckErr(err)

			if nome.Id == nil {
				nome.Id = tools.ToPrt(1)
			}

			if members.Id != nil {
				nome.FkIdFamilia = tools.ToPrt(*members.Id)
			}

			query = "insert into familia_membros(id,familia_id, nome_membro, confirmado) values($1,$2,$3,$4)"
			_, err = txx.Exec(txx.Rebind(query), nome.Id, nome.FkIdFamilia, nome.NomeMembro, "N")
			tools.CheckErr(err)

		}

	}

	err := txx.Commit()
	if err != nil {
		return err
	}

	return nil

}
