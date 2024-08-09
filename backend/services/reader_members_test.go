package services

import (
	"fmt"
	"testing"

	"github.com/alpha_main/config"
	"github.com/alpha_main/models"
	"github.com/alpha_main/tools"
	"github.com/tealeg/xlsx"
)

func TestGetMembers(t *testing.T) {

	file := LeitorXlsx("../files/arquivo_membros.xlsx")

	membersStorage := []models.Familia{}

	for _, sheet := range file.Sheets {

		for _, row := range sheet.Rows {

			members := models.Familia{}

			for c, cell := range row.Cells {

				if c == 0 {
					members.NomeFamilia = fmt.Sprintf("Familia %v", cell.Value)

				}

				members.NomeMembro = append(members.NomeMembro,
					models.MembroFamilia{
						Nome: cell.Value,
					})
			}

			membersStorage = append(membersStorage, members)
		}

	}

	db := tools.ConnectPostgres(&config.DbConfigPostgres{
		DbName:   "mydatabase",
		Password: "leoPost1234",
		User:     "leonardo",
	})

	tx, err := db.Beginx()
	tools.CheckError(err)

	defer db.Close()

	for _, members := range membersStorage {

		err := tx.Get(&members.Id, "select max(id)+1 id from familia f")
		tools.CheckError(err)

		radomKey, err := tools.GenerateRandomKey(6)
		tools.CheckError(err)

		query := "insert into familia(id,codigo,nome_familia) values($1,$2,$3)"

		_, err = tx.Exec(tx.Rebind(query), members.Id, radomKey, members.NomeFamilia)
		tools.CheckError(err)

		for _, nome := range members.NomeMembro {

			nome.Nome = tools.CleanString(nome.Nome)

			if nome.Nome == "" {
				continue
			}

			err := tx.Get(&nome.Id, "select max(id)+1 id from familia_membros fm")
			tools.CheckError(err)

			query = "insert into familia_membros(id,familia_id, nome_membro) values($1,$2,$3)"

			nome.FkIdFamilia = members.Id

			_, err = tx.Exec(tx.Rebind(query), nome.Id, nome.FkIdFamilia, nome.Nome)
			tools.CheckError(err)
		}

	}

	err = tx.Commit()
	tools.CheckError(err)

}

func LeitorXlsx(filePath string) *xlsx.File {

	// Abrir o arquivo xlsx
	xlsxFile, err := xlsx.OpenFile(filePath)
	if err != nil {
		panic(err)
	}

	return xlsxFile

}
