package database

import (
	"github.com/alpha_main/util"
	"github.com/jmoiron/sqlx"
)

type DAO struct {
	DB []sqlx.DB
}

func New(dbs []sqlx.DB, u *util.Util) *DAO {
	return &DAO{
		DB: dbs,
	}
}

func (d *DAO) DBConx1() *sqlx.DB {
	return &d.DB[0]
}
