package services

import (
	"net/http"

	"github.com/alpha_main/models"
)

func (s *Service) GetCountMembers(w http.ResponseWriter, r *http.Request) {

	var err error
	var qtd int
	defer func() {

		resp := models.GenericResponse{
			Code:    http.StatusOK,
			Message: "Consulta realizada com sucesso",
		}

		rr := struct {
			models.GenericResponse
			models.CountMembers
		}{
			GenericResponse: resp,
			CountMembers:    models.CountMembers{Quantidade: qtd},
		}

		if err != nil {
			resp.Code = http.StatusInternalServerError
		}

		s.Responser(w, resp.Code, rr)

	}()

	qtd, err = s.GetCountMem()

}
