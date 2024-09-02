package services

import (
	"net/http"

	"github.com/alpha_main/models"
	"github.com/go-chi/chi"
)

func (s *Service) DeleteMember(w http.ResponseWriter, r *http.Request) {

	var err error
	defer func() {

		resp := models.GenericResponse{
			Code:    http.StatusOK,
			Message: "Deletado com sucesso",
		}

		if err != nil {
			resp.Code = http.StatusInternalServerError
		}

		s.Responser(w, resp.Code, resp)

	}()

	code := chi.URLParam(r, "code")

	txx, err := s.DBConx1().Beginx()
	if err != nil {
		return
	}

	sqlOp := `
select fm.id from familia_membros fm 
  inner join familia f on fm.familia_id  = f.id 
 where f.codigo = $1`

	var ids []int

	err = txx.Select(&ids, sqlOp, code)
	if err != nil {
		return
	}

	for i := 0; i < len(ids); i++ {

		sqlOp = `delete from familia_membros fm where fm.id = $1`
		_, err := txx.Exec(sqlOp, ids[i])
		if err != nil {
			return
		}

	}

	sqlOp = "delete from familia f where f.codigo = $1"

	_, err = txx.Exec(sqlOp, code)
	if err != nil {
		return
	}

	if err = txx.Commit(); err != nil {
		return
	}

}
