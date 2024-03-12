create database db_acme_filmes_turma_aa;

use db_acme_filmes_turma_aa;

create table tbl_filme (
id int not null auto_increment primary key,
nome varchar(100) not null,
sinopse text not null,
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(300) not null,
valor_unitario float,

unique key(id),
unique index(id)

);

show tables;

####### Permite visualizar a estrutura de uma tabela
desc tbl_filme;
describe tbl_filme;

insert into tbl_filme ( nome,
						sinopse,
						duracao,
						data_lancamento,
						data_relancamento,
						foto_capa,
						valor_unitario
                        ) values (
                        'Entre Facas e Segredos',
                        'Depois de fazer 85 anos, Harlan Thrombey, um famoso escritor de histórias policiais, é encontrado morto. Contratado para investigar o caso, o detetive Benoit Blanc descobre que, entre os funcionários misteriosos e a família conflituosa de Harlan, todos podem ser considerados suspeitos do crime.',
                        '02:09:00',
                        '2019-12-5',
                        null,
                        'https://br.web.img3.acsta.net/pictures/19/12/10/00/10/1646487.jpg',
                        '19.99'
                        ),
                        (
                        'Continência ao Amor',
                        'Uma cantora se casa por conveniência com um militar que está prestes a ir para a guerra, mas uma tragédia transforma esse relacionamento de fachada em realidade.',
                        '02:02:00',
                        '2022-07-29',
                        null,
                        'https://br.web.img3.acsta.net/pictures/22/08/09/21/09/3949781.jpg',
                        '19.99'
                        );


