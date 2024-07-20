package services

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi"
)

func (s *Service) GetFamilyLastName(w http.ResponseWriter, r *http.Request) {

	type MembroFamilia struct {
		Id   int    `db:"id" json:"id"`
		Nome string `db:"nome_membro" json:"nome"`
	}

	type Familia struct {
		Id          int             `db:"id_familia" json:"id"`
		NomeFamilia string          `db:"nome_familia" json:"nome_familia"`
		NomeMembros []MembroFamilia `db:"nome_membro" json:"membros"`
	}

	log.Println(r.URL.Path)
	code := chi.URLParam(r, "id")

	data := Familia{}
	sqlOp := `
	select 
      f.id id_familia,
      f.nome_familia
    from familia f
    where f.codigo = $1`

	sqlOp2 := `
	select
	 fm.id,
	 fm.nome_membro 
	from familia_membros fm
	where fm.familia_id = $1`

	err := s.DBs[0].Get(&data, sqlOp, code)
	if err != nil {
		panic(err)
	}

	err = s.DBs[0].Select(&data.NomeMembros, sqlOp2, data.Id)
	if err != nil {
		panic(err)
	}

	bdata, err := json.MarshalIndent(data, "  ", "   ")
	if err != nil {
		panic(err)
	}

	log.Println(string(bdata))

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(data)
	if err != nil {
		panic(err)
	}

}
