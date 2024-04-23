/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();

const selectAllSexos = async function(){

    let sql = 'select * from tbl_sexo';

    /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

    let rsSexo = await prisma.$queryRawUnsafe(sql);

    if(rsSexo.length > 0){
        return rsSexo;
    }else{
        return false
    }
}

const selectByIdSexo = async function(){

    try{

        let sql = `select * from tbl_sexo where id = where id = ${id}`;

        let rsSexo = await prisma.$queryRawUnsafe(sql);

        return rsSexo;

    }catch(error){
        return false
    }
}