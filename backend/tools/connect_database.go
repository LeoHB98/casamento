package tools

import (
	"fmt"
	"log"
	"strings"

	"github.com/alpha_main/config"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
	"github.com/jmoiron/sqlx/reflectx"
	"github.com/pkg/errors"
	_ "github.com/sijms/go-ora/v2"
)

func ToConnectDBs(allDbCnt config.AllDbsConfig) ([]sqlx.DB, error) {

	var connections []sqlx.DB

	for _, v := range allDbCnt.Oracle {

		if v.DbUser == "" {
			continue
		}

		db, err := ConnectDBOracle(&v)
		if err != nil {
			return nil, err
		}
		connections = append(connections, *db)
	}

	connections = append(connections, *ConnectPostgres(allDbCnt.Postgres))

	return connections, nil
}

func ConnectDBOracle(dbCxn *config.DBConfigOracle) (*sqlx.DB, error) {

	db, err := sqlx.Open("oracle", fmt.Sprintf("oracle://%s:%s@%s:%d/%s", dbCxn.DbUser, dbCxn.DbPass, dbCxn.DbHost, dbCxn.DbPort, dbCxn.DbSid))
	if err != nil {
		return nil, errors.Wrap(err, "erro ao abrir conexao")
	}

	err = db.Ping()
	if err != nil {
		return nil, errors.Wrap(err, "erro ao pingar no banco")
	}

	db.Mapper = reflectx.NewMapperTagFunc("db",
		nil,
		func(s string) string {
			return strings.ToUpper(s)
		},
	)

	sqlx.BindDriver("oracle", sqlx.NAMED)

	return db, nil
}

func ConnectPostgres(dbCxn *config.DbConfigPostgres) *sqlx.DB {

	connStr := fmt.Sprintf("postgres://%v:%v@%v:5432/%v?sslmode=disable", dbCxn.User, dbCxn.Password, dbCxn.Host, dbCxn.DbName)

	// log.Println(connStr)

	db, err := sqlx.Connect("pgx", connStr)
	if err != nil {
		log.Fatal(err)
	}

	db.Mapper = reflectx.NewMapperTagFunc("db",
		nil,
		func(s string) string {
			return strings.ToLower(s)
		},
	)

	// Registrar o driver pgx com sqlx
	sqlx.BindDriver("pgx", sqlx.NAMED)

	return db

}
