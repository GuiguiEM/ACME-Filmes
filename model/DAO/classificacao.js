/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();

const insertClassificacao = async function(dadosClassificacao){

    try{

        let sql

        sql = `insert into tbl_classificacao(faixa_etaria,
                                            classificacao,
                                            caracteristica,
                                            icone
        )values(
                                            faixa_etaria = '${dadosClassificacao.faixa_etaria}',
                                            classificacao = '${dadosClassificacao.classificacao}',
                                            caracteristica = '${dadosClassificacao.caracteristica}',
                                            icone = '${dadosClassificacao.icone}'
        )`

        console.log(dadosClassificacao)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch(errror){
        return false
    }
}
const updateClassificacao = async function(id, dadosClassificacao, content){

    try{

        let sql

        sql = `update tbl_classificacao set
            faixa_etaria = '${dadosClassificacao.faixa_etaria}',
            classificacao = '${dadosClassificacao.classificacao}',
            caracteristica = '${dadosClassificacao.caracteristica}',
            icone = '${dadosClassificacao.icone}'
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

const deleteClassificacao = async function(id){
    
    try{

        let sql = `delete from tbl_classificacao where id = ${id}`;

        let rsClassificacao = await prisma.$executeRawUnsafe(sql);

        return rsClassificacao;

    }catch(error){
        return false;
    }
}

const selectAllClassificacoes = async function(){

    let sql = 'select * from tbl_classificacao';

     /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

     let rsClassificacao = await prisma.$queryRawUnsafe(sql);

     if(rsClassificacao.length > 0)
        return rsClassificacao;
    else
        return false
}

const selectByIdClassificacao = async function(id){
    
    try{
        let sql = `select * from tbl_classificacao where id = ${id}`;

        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

        return rsClassificacao;

    }catch(error){
        return false;
    }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacoes,
    selectByIdClassificacao
}