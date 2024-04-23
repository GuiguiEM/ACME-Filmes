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

const insertGenero = async function(dadosGenero){

    try{

        let sql

        sql = `insert into tbl_genero (nome
        )values(
            '${dadosGenero.nome}'
        )`

        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const updateGenero = async function(id, dadosGenero){

    try{

        let sql

        sql = `update tbl_genero set 
        nome = "${dadosGenero.nome}"
        where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }

}

const deleteGenero = async function(id){

    try{

        let sql = `delete from tbl_genero where id = ${id}`;

        let rsGenero = await prisma.$queryRawUnsafe(sql);

        return rsGenero;

    }catch(error) {
        return false;
    }

}

const selectAllGeneros = async function(){
    
    let sql = 'select * from tbl_genero';

    /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

    let rsGenero = await prisma.$queryRawUnsafe(sql);

    if(rsGenero.length > 0)
        return rsGenero;
    else
        return false
}

const selectByIdGenero = async function(id){
    try{
        let sql = `select * from tbl_genero where id = ${id}`;

        let rsGenero = await prisma.$queryRawUnsafe(sql);

        return rsGenero;

    }catch(error) {
        return false;
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    selectAllGeneros,
    selectByIdGenero,
    deleteGenero
}