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

const selectByIdNacionalidadeDiretor = async function(id){
    try {
        let sql=`select tbl_nacionalidade.id, tbl_nacionalidade.nome from tbl_diretor_nacionalidade
        join tbl_nacionalidade on tbl_diretor_nacionalidade.id_nacionalidade = tbl_nacionalidade.id
        join tbl_diretor on tbl_diretor_nacionalidade.id_diretor = tbl_diretor.id
        where tbl_diretor.id = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade
    } catch(error) {
        return false
    }
}

const insertNacionalidadeDiretor = async function(dadosNacionalidadeDiretor){

    try{

        let sql = `select into tbl_diretor_nacionalidade(id_diretor, id_nacionalidade
            )values(
                '${dadosNacionalidadeDiretor.id_diretor}',
                '${dadosNacionalidadeDiretor.id_nacionalidade}'
            )`

            let result = await prisma.$executeRawUnsafe(sql);

            if(result)
                return true;
            else
                return false;

    }catch(error){
        return false;
    }
}

module.exports = {
    selectAllNacionalidades,
    selectByIdNacionalidade,
    selectByIdNacionalidadeDiretor,
    insertNacionalidadeDiretor
}