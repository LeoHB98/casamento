package tools

import (
	"github.com/alpha_main/config"
	"github.com/jmoiron/sqlx"
)

type Tools struct {
	*config.Config
	Dbs []sqlx.DB
}

func New(c *config.Config, d []sqlx.DB) *Tools { return &Tools{Config: c, Dbs: d} }
