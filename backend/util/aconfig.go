package util

import (
	"database/sql"

	"github.com/alpha_main/config"
	"github.com/jlaffaye/ftp"
	"github.com/jmoiron/sqlx"
)

type Util struct {
	*config.Config
	DB []sqlx.DB
	TX *sql.Tx
	*ftp.ServerConn
}

func New(c *config.Config, d []sqlx.DB) *Util {
	return &Util{Config: c, DB: d}
}
