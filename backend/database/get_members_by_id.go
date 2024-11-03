package database

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/alpha_main/models"
	"github.com/alpha_main/tools"
	"github.com/go-chi/chi"
)

func (s *DAO) GetFamilyLastName(w http.ResponseWriter, r *http.Request) {

	var data models.CompiledMembers
	existsCode := 0

	defer func() {

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		code := http.StatusOK

		if existsCode == 0 {
			code = http.StatusNotFound
		}

		if data.DataConfirmacao != nil {
			code = http.StatusAccepted
		}

		data.HttpCode = code
		w.WriteHeader(code)

		err := json.NewEncoder(w).Encode(data)
		if err != nil {
			panic(err)
		}

	}()

	log.Println(r.URL.Path)

	code := strings.ToUpper(chi.URLParam(r, "code"))
	sqlOp := `
	select 
      f.id,
      f.nome_familia,
	  f.data_confirmacao
    from familia f
    where f.codigo = $1`

	sqlOp2 := `
	select
	 fm.id,
	 fm.nome_membro 
	from familia_membros fm
	where fm.familia_id = $1
	order by fm.id asc
	`

	err := s.DB[0].Get(&existsCode, "select count(f.codigo) from familia f where f.codigo = $1", code)
	tools.CheckErr(err)

	if existsCode == 0 {
		log.Println("Codigo requerido nao existe")
		return
	}

	err = s.DB[0].Get(&data, sqlOp, code)
	if err != nil {
		panic(err)
	}

	err = s.DB[0].Select(&data.NomeMembros, sqlOp2, data.Id)
	if err != nil {
		panic(err)
	}

	bdata, err := json.MarshalIndent(data, "  ", "   ")
	if err != nil {
		panic(err)
	}

	log.Println(string(bdata))

}
