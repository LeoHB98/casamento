package services

import (
	"fmt"
	"testing"
	"time"

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

				if cell.Value == "" {
					continue
				}

				if c == 0 {
					nomeFamilia := fmt.Sprintf("Familia %v", cell.Value)
					members.NomeFamilia = &nomeFamilia

				}

				members.NomeMembro = append(members.NomeMembro,
					models.MembroFamilia{
						Nome: tools.ToPrt(cell.Value),
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
	tools.CheckErr(err)

	defer db.Close()

	for _, members := range membersStorage {

		if members.NomeFamilia == nil {
			continue
		}

		err := tx.Get(&members.Id, "select max(id)+1 id from familia f")
		tools.CheckErr(err)

		if members.Id == nil {
			members.Id = tools.ToPrt(1)
		}

		radomKey, err := tools.GenerateRandomKey(3)
		tools.CheckErr(err)

		query := "insert into familia(id,codigo,nome_familia, data_criacao) values($1,$2,$3,$4)"

		timeNow := time.Now().Format("2006-01-02 15:04:05")

		_, err = tx.Exec(tx.Rebind(query), members.Id, radomKey, tools.CleanString(*members.NomeFamilia), timeNow)
		tools.CheckErr(err)

		for _, nome := range members.NomeMembro {

			nome.Nome = tools.ToPrt(tools.CleanString(*nome.Nome))

			if nome.Nome == nil {
				continue
			}

			err := tx.Get(&nome.Id, "select max(id)+1 id from familia_membros fm")
			tools.CheckErr(err)

			if nome.Id == nil {
				nome.Id = tools.ToPrt(1)
			}

			if members.Id != nil {
				nome.FkIdFamilia = tools.ToPrt(*members.Id)
			}

			query = "insert into familia_membros(id,familia_id, nome_membro, confirmado) values($1,$2,$3,$4)"
			_, err = tx.Exec(tx.Rebind(query), nome.Id, nome.FkIdFamilia, nome.Nome, "N")
			tools.CheckErr(err)

		}

	}

	err = tx.Commit()
	tools.CheckErr(err)

}

func LeitorXlsx(filePath string) *xlsx.File {

	// Abrir o arquivo xlsx
	xlsxFile, err := xlsx.OpenFile(filePath)
	tools.CheckErr(err)
	return xlsxFile

}
