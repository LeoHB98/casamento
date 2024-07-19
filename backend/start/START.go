package start

import (
	"github.com/alpha_main/config"
	"github.com/alpha_main/tools"
	"github.com/alpha_main/util"

	"github.com/jlaffaye/ftp"
	"github.com/jmoiron/sqlx"
)

type Start struct {
	DbsConx []sqlx.DB
	*tools.Tools
	*util.Util
	*config.Config
	*ftp.ServerConn
}

// Retorna a conexão com o banco e as ferramentas para o sistema
func New(cfg *config.Config) (*Start, error) {

	var err error

	s := Start{}
	s.Config = cfg
	s.DbsConx, err = tools.ToConnectDBs(*cfg.AllDbsConfig)
	if err != nil {
		return &Start{}, err
	}

	s.Tools = tools.New(s.Config, s.DbsConx)
	s.Util = util.New(cfg, s.DbsConx)

	return &s, nil
}
