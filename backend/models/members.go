package models

import "time"

type CompiledMembers struct {
	HttpCode        int             `json:"httpCode"`
	Codigo          *string         `json:"codigo" db:"codigo"`
	Id              *int            `json:"id" db:"id" `
	NomeFamilia     *string         `json:"nomeFamilia" db:"nome_familia"`
	DataConfirmacao *time.Time      `json:"dataConfirmacao" db:"data_confirmacao"`
	DataCriacao     *time.Time      `json:"dataCriacao" db:"data_criacao"`
	NomeMembros     []MembroFamilia `json:"membros" db:"nome_membro"`
}

type MembroFamilia struct {
	Id              *int       `db:"id" json:"id"`
	FkIdFamilia     *int       `db:"familia_id"`
	NomeMembro      *string    `json:"nomeMembro" db:"nome_membro"`
	DataAtualizacao *time.Time `json:"dataAtualizacao" db:"data_atualizacao"`
	Confirmado      *string    `json:"confirmado" db:"confirmado"`
}
