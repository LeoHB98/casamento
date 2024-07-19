package services

import (
	"github.com/alpha_main/database"
	"github.com/alpha_main/start"
)

type Service struct {
	*start.Start
	*database.DAO
}

func New(s *start.Start, d *database.DAO) *Service { return &Service{Start: s, DAO: d} }
