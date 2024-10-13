create table familia (
    id numeric primary key,
    codigo varchar(255),
    nome_familia varchar(255),
    data_criacao timestamp,
    data_confirmacao timestamp
)

create table familia_membros(
id numeric primary key,
familia_id numeric references familia(id),
nome_membro varchar(255),
confirmado char(1),
data_atualizacao timestamp
);