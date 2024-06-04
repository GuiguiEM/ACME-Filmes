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
                sql = `insert into tbl_diretor(
                    nome,
                    foto,
                    data_nascimento,
                    data_falecimento,
                    biografia,
                    id_sexo
                    ) values (
                        '${dadosDiretores.nome}',
                        '${dadosDiretores.foto}',
                        '${dadosDiretores.data_nascimento}',
                        null,
                        '${dadosDiretores.biografia}',
                        '${dadosDiretores.id_sexo}'
                        )`
            }else {
                sql = `insert into tbl_diretor(
                    nome,
                    foto,
                    data_nascimento,
                    data_falecimento,
                    biografia,
                    id_sexo
                    ) values (
                        '${dadosDiretores.nome}',
                        '${dadosDiretores.foto}',
                        '${dadosDiretores.data_nascimento}',
                        '${dadosDiretores.data_falecimento}',
                        '${dadosAtores.biografia}',
                        '${dadosDiretores.id_sexo}'
                        )`

            }
        // Executa o script SQL no banco de dados | Devemos usar execute e não query!
        // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
        let result = await prisma.$executeRawUnsafe(sql);

        let lastDiretorId = await selectLastDiretor();

        // Validação para verificar se o insert funcionou no banco de dados
        if(result)
            {
                for(let nacionalidade of dadosDiretores.nacionalidade){
                    sql = `insert into tbl_diretor_nacionalidade(id_diretor, id_nacionalidade) values('${lastDiretorId[0].id}', '${nacionalidade}')`

                    result = await prisma.$executeRawUnsafe(sql)

                    if(result)
                        continue
                    else
                        return false
                }
                return true
            }
        else
            return false;

    } catch (error) {
        console.log(error)
        return false;
        
    }
}

const updateDiretor = async function(id, dadosDiretores){

    try {

        let sql;
           if( dadosDiretores.data_falecimento == null ||
               dadosDiretores.data_falecimento == ''   ||
               dadosDiretores.data_falecimento == undefined){
                   sql = `UPDATE tbl_diretor SET
                        nome = '${dadosDiretores.nome}',
                        foto = '${dadosDiretores.foto}',
                        data_nascimento = '${dadosDiretores.data_nascimento}',
                        data_falecimento = '${dadosDiretores.data_falecimento}',
                        biografia = '${dadosDiretores.biografia}',
                        id_sexo = '${dadosDiretores.id_sexo}'
                        where id = '${id}'
                        `
               }else {
                   sql = `UPDATE tbl_diretor SET
                        nome = '${dadosDiretores.nome}',
                        foto = '${dadosDiretores.foto}',
                        data_nascimento = '${dadosDiretores.data_nascimento}',
                        biografia = '${dadosDiretores.biografia}',
                        id_sexo = '${dadosDiretores.id_sexo}'
                        where id = '${id}'
                        `
   
               }
           // Executa o script SQL no banco de dados | Devemos usar execute e não query!
           // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
           let result = await prisma.$executeRawUnsafe(sql);
   
           let lastDiretorId = await selectLastDiretor();
   
           // Validação para verificar se o insert funcionou no banco de dados
           if(result)
               {
                   for(let nacionalidade of dadosDiretores.nacionalidade){
                       sql = `UPDATE SET tbl_diretor_nacionalidade(
                            id_diretor,
                            id_nacionalidade
                        ) values(
                            '${lastDiretorId[0].id}',
                            '${nacionalidade}'
                            )`
   
                       result = await prisma.$executeRawUnsafe(sql)
   
                       if(result)
                           continue
                       else
                           return false
                   }
                   return true
               }
           else
               return false;
   
       } catch (error) {
           console.log(error)
           return false;
           
       }
   }

const selectLastDiretor = async function(){
    try {
        let sql='select cast(last_insert_id() as decimal) as id from tbl_diretor limit 1;'
        let rsID = await prisma.$queryRawUnsafe(sql)
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
    updateDiretor,
    selectLastDiretor
}