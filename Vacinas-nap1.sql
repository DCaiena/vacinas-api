create schema vacinasdb;
use vacinasdb;
create table  crianca (
	_id int primary key auto_increment not null,
    nome varchar(50),
    cpf varchar(11)
);

create table vacina(
	_id int primary key auto_increment not null,
    nome varchar(20),
    fabricante varchar(50),
    descricao varchar(50)
);

create table vacinacao(
	_id int primary key auto_increment not null,
    lote varchar(20),
    data_vacinacao datetime,
    enfermeiro varchar(50),
    vacina_id int,
    crianca_id int,
	foreign key (crianca_id) references crianca(_id),
    foreign key (vacina_id) references vacina(_id)
);

insert into crianca value(null, 'Diego Caiena','02300137240');
insert into vacina value(null, 'APFAIZERR','pfaizerltd','Vacina contra covid');
select * from vacina;
insert into vacinacao value(null, 'xxxxxxxx01', '2021-06-26', 'Gabriel Carvalho', 1, 1);
select * from vacinacao;
