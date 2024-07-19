package database

import (
	"github.com/alpha_main/util"
	"github.com/jmoiron/sqlx"
)

type DAO struct {
	DBs []sqlx.DB
}

func New(dbs []sqlx.DB, u *util.Util) *DAO {
	return &DAO{
		DBs: dbs,
	}
}
