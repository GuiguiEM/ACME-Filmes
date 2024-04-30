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

    try{

        let sql = 'select * from tbl_diretor';

    /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

    let rsDiretor = await prisma.$queryRawUnsafe(sql);

    return rsDiretor
    }catch(error){
        console.log(error)
        return false
    }
}

const selectByIdDiretor = async function(id){

    try{

        let sql = `select * from tbl_diretor where id = ${id}`;

        let rsDiretor = await prisma.$queryRawUnsafe(sql);

        return rsDiretor;

    }catch(error){
        return false
    }
}

const deleteDiretor = async function(id){

    try{

        let sql = `delete from tbl_diretor_nacionalidade where id_diretor = ${id}`

        let rsIntermediaria = await prisma.$executeRawUnsafe(sql)
        if(rsIntermediaria){
            sql = `delete from tbl_diretor where id = ${id}`
            
            rsDiretor = await prisma.$executeRawUnsafe(sql)

            return rsDiretor

        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

const insertDiretor =  async function(dadosDiretores) {
    
    try {

     let sql;
        if( dadosDiretores.datafalecimento == null || 
            dadosDiretores.datafalecimento == ''   ||
            dadosDiretores.datafalecimento == undefined){
                sql = `insert into tbl_diretores(nome, data_nascimento, foto, data_falecimento, biografia) values ('${dadosDiretores.nome}', '${dadosDiretores.data_nascimento}', '${dadosDiretores.foto}', null, '${dadosDiretores.biografia}')`
            }else {
                sql = `insert into tbl_diretores(nome, data_nascimento, foto, data_falecimento, biografia) values ('${dadosDiretores.nome}', '${dadosDiretores.data_nascimento}', '${dadosDiretores.foto}', '${dadosDiretores.data_falecimento}', '${dadosAtores.biografia}')`

            }
        // Executa o script SQL no banco de dados | Devemos usar execute e não query!
        // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Validação para verificar se o insert funcionou no banco de dados
        if(result )
            return true;
        else
            return false;

    } catch (error) {

        return false;
        
    }
}

const selectLastID=async function(){
    try {
        let sql='select cast(last_insert_id() as decimal) as id from tbl_diretor limit 1;'
        let rsID=await prisma.$queryRawUnsafe(sql)
        return rsID
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllDiretores,
    selectByIdDiretor,
    deleteDiretor,
    insertDiretor,
    selectLastID
}