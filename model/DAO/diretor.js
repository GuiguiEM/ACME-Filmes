/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require("@prisma/client");

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();

const selectAllDiretores = async function(){

    let sql = 'select * from tbl_diretor';

    /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

    let rsDiretor = await prisma.$queryRawUnsafe(sql);

    if(rsDiretor.length > 0){
        return rsDiretor
    }else{
        return false
    }
}