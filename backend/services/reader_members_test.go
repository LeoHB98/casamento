package services

import (
	"fmt"
	"testing"

	"github.com/alpha_main/config"
	"github.com/alpha_main/database"
	"github.com/alpha_main/models"
	"github.com/alpha_main/tools"
	"github.com/tealeg/xlsx"
)

func TestGetMembers(t *testing.T) {

	file := LeitorXlsx("../files/arquivo_membros.xlsx")

	membersStorage := []models.CompiledMembers{}

	for _, sheet := range file.Sheets {

		for _, row := range sheet.Rows {

			members := models.CompiledMembers{}

			for c, cell := range row.Cells {

				if cell.Value == "" {
					continue
				}

				if c == 0 {
					nomeFamilia := fmt.Sprintf("Familia %v", cell.Value)
					members.NomeFamilia = &nomeFamilia

				}

				members.NomeMembros = append(members.NomeMembros,
					models.MembroFamilia{
						NomeMembro: tools.ToPrt(cell.Value),
					})
			}

			membersStorage = append(membersStorage, members)
		}

	}

	db := tools.ConnectPostgres(&config.DbConfigPostgres{
		DbName:   "mydatabase",
		Password: "leoPost1234",
		User:     "leonardo",
		Host:     "localhost",
	})

	txx, err := db.Beginx()
	tools.CheckErr(err)

	defer db.Close()

	if err := database.InsertNewMembers(membersStorage, txx); err != nil {
		tools.CheckErr(err)
	}
}

func LeitorXlsx(filePath string) *xlsx.File {

	// Abrir o arquivo xlsx
	xlsxFile, err := xlsx.OpenFile(filePath)
	tools.CheckErr(err)
	return xlsxFile

}
