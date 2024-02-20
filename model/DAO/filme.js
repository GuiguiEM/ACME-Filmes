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
const insertFilme = async function(){

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