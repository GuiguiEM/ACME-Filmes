/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import da biblioteca do prisma client
const {PrismaClient} = require('@prisma/client')

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();


// Função para inserir um filme no Banco de Dados
const insertFilme = async function(dadosFilme){
    
    try {
    //Cria a variavel SQL
    let sql;

    //Validação para verificar se a data de relançamento é vazia, pois devemos ajustar o script SQL para o BD --- 
    //OBS: essa condiçao é provisória, já que iremos tratar no BD com uma procedure
    if(dadosFilme.data_relancamento == null ||
    dadosFilme.data_relancamento == undefined ||
    dadosFilme.data_relancamento == ''
    ){
        //Script SQL com valor null para a data
    sql = `insert into tbl_filme (nome,
                                      sinopse,
                                      duracao,
                                      data_lancamento,
                                      data_relancamento,
                                      foto_capa,
                                      valor_unitario
                                      ) values (
                                        '${dadosFilme.nome}',
                                        '${dadosFilme.sinopse}',
                                        '${dadosFilme.duracao}',
                                        '${dadosFilme.data_lancamento}',
                                        null,
                                        '${dadosFilme.foto_capa}',
                                        '${dadosFilme.valor_unitario}'
                                      )
                                 )`
    }else{
        //Script 
        sql = `insert into tbl_filme ( nome,
                                        sinopse,
                                        duracao,
                                        data_lancamento,
                                        data_relancamento,
                                        foto_capa,
                                        valor_unitario
                                        ) values (
                                        '${dadosFilme.nome}',
                                        '${dadosFilme.sinopse}',
                                        '${dadosFilme.duracao}',
                                        '${dadosFilme.data_lancamento}',
                                        null,
                                        '${dadosFilme.foto_capa}',
                                        '${dadosFilme.valor_unitario}'
                                        )
       )`
    }

    //$executeRawUnsafe() - Serve para executar scripts SQL que não retornam valores (Insert, Update e Delete)
    //$queryRawUnsafe() - Serve para executar scripts SQL que RETORNAM dados do BD (select)
    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true;
    else
        return false;
    }catch(error){
        return false;
    }
}

// Função para atualizar um filme no Banco de Dados
const updateFilme = async function(){

}

// Função para excluir um filme no Banco de Dados
const deleteFilme = async function(){

}

// Função para retornar todos os filmes do Banco de Dados
const selectAllFilmes = async function(){
    let sql = 'select * from tbl_filme';

    /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    if(rsFilmes.length > 0)
        return rsFilmes;
        else
        return false
}

// Função para buscar um filme no Banco de Dados filtrando pelo ID
const selectByIdFilme = async function(id){

    try{
        let sql = `select * from tbl_filme where id = ${id}`;

        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;

    } catch(error){
        return false;
    }
    
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}