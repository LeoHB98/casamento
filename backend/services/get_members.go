package services

import "net/http"

func (s *Service) GetAllMembers(w http.ResponseWriter, r *http.Request) {

	// sqlOp := "select * from familia f inner join familia_membros fm on f.id = fm.familia_id order by f.nome_familia asc"

}

func (s *Service) GetMembersConfirmed(w http.ResponseWriter, r *http.Request) {}
