/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();

// const updateGenero = async function (id, dadosGenero){

//     try{

//         let sql
// if{
//         sql = `UPDATE tbl_genero SET
//         nome = "${dadosGenero.nome}"
//         where id = ${id}`
// }

const selectAllGeneros = async function(){
    let sql = 'select * from tbl_genero';

    /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

    let rsGeneros = await prisma.$queryRawUnsafe(sql);

    if(rsGeneros.length > 0)
        return rsGeneros;
    else
        return false
}

module.exports = {
    selectAllGeneros
}