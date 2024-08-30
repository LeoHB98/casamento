package services

import (
	"net/http"

	"github.com/alpha_main/models"
	"github.com/alpha_main/tools"
)

func (s *Service) Login(w http.ResponseWriter, r *http.Request) {

	var err error
	resp := models.GenericResponse{}
	defer func() {
		if err != nil {
			resp.Message = "Erro de servidor"
			resp.Code = http.StatusInternalServerError
		}

		s.Responser(w, resp.Code, resp)
	}()

	sqlOp := `
			select count(id) from usuarios where nome = $1 and senha = $2
	`

	user := r.URL.Query().Get("username")
	pass := r.URL.Query().Get("password")

	exists := 0
	err = s.DBConx1().Get(&exists, sqlOp, user, pass)
	tools.CheckErr(err)

	if exists != 0 {
		resp.Code = http.StatusOK
		resp.Message = "Login confirmado"
		return
	}

	resp.Code = http.StatusNotFound
	resp.Message = "Usuário e/ou senha não encontrado"

}
