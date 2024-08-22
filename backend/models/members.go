package models

import "time"

type Familia struct {
	HttpCode      int             `json:"http_code"`
	Id            *int            `db:"id_familia" json:"id"`
	NomeFamilia   *string         `db:"nome_familia" json:"nome_familia"`
	DateConfirmed *time.Time      `db:"data_confirmacao" json:"data_confirmada"`
	NomeMembro    []MembroFamilia `db:"nome_membro" json:"membros"`
}

type MembroFamilia struct {
	Id          *int    `db:"id" json:"id"`
	FkIdFamilia *int    `db:"familia_id"`
	Nome        *string `db:"nome_membro" json:"nome"`
}
