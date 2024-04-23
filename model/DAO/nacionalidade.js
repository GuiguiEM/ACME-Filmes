/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const selectAllNacionalidades = async function(){
    
    let sql = 'select * from tbl_nacionalidade';

     /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

     let rsNacionalidade = await prisma.$queryRawUnsafe(sql);

     if(rsNacionalidade.length > 0){
        return rsNacionalidade;
     }else{
        return false
     }
}

const selectByIdNacionalidade = async function(id){

    try{

        let sql = `select * from tbl_nacionalidade where id = ${id}`;

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql);

        return rsNacionalidade;

    }catch(error){
        return false
    }
}

module.exports = {
    selectAllNacionalidades,
    selectByIdNacionalidade
}