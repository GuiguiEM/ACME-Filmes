/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const diretorDAO = require('../model/DAO/diretor.js')
const sexoDAO = require('../model/DAO/sexo.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')

const getListarDiretores = async function(){
        
    let diretorJSON = {};

    let dadosDiretores = await diretorDAO.selectAllDiretores();

    if(dadosDiretores){
        if(dadosDiretores.length > 0){
            for(let diretor of dadosDiretores){
                diretor.sexo = await sexoDAO.selectByIdSexo(diretor.id)
                diretor.nacionalidade = await nacionalidadeDAO.selectByIdNacionalidadeDiretor(diretor.id)
                delete diretor.id_sexo
                delete diretor.id_nacionalidade
            }

            diretorJSON.diretor = dadosDiretores
            diretorJSON.quantidade = dadosDiretores.length
            diretorJSON.status_code = 200

            return diretorJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }

}

const getBuscarDiretor = async function(id){

    let idDiretor = id
    let diretorJSON = {}

    if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosDiretores = await diretorDAO.selectByIdDiretor(idDiretor)

        if(dadosDiretores){
            if(dadosDiretores.length > 0){
                for(let diretor of dadosDiretores){
                    diretor.sexo = await sexoDAO.selectByIdSexo(diretor.id)
                    diretor.nacionalidade = await nacionalidadeDAO.selectByIdNacionalidadeDiretor(diretor.id)
                    delete diretor.id_sexo
                    delete diretor.id_nacionalidade
                }

                diretorJSON.diretor = dadosDiretores
                diretorJSON.quantidade = dadosDiretores.length
                diretorJSON.status_code = 200

                return diretorJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

const setExcluirDiretor = async function(id){

    try{
        
        let idDiretor = id

        let validaDiretor = await getBuscarDiretor(idDiretor)

        let dadosDiretores = await diretorDAO.deleteDiretor(idDiretor)

        if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID

        }else if(validaDiretor.status == false){
            return message.ERROR_NOT_FOUND

        }else{
            if(dadosDiretores)
            return message.SUCCESS_DELETED_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirNovoDiretor = async (dadosDiretores, contentType) => {

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultDadosDiretor = {}

    // Validação de campos obrigatórios e consistência de dados
    if( dadosDiretores.nome == ''                       || dadosDiretores.nome == undefined              || dadosDiretores.nome.length > 150              ||
        dadosDiretores.data_nascimento == ''            || dadosDiretores.data_nascimento == undefined            || dadosDiretores.data_nascimento.length > 10       || 
        dadosDiretores.foto == ''                       || dadosDiretores.foto == undefined           ||dadosDiretores.foto.length > 65000           || 
        dadosDiretores.biografia == ''                  || dadosDiretores.biografia == undefined   ||dadosDiretores.biografia.length > 65000   || 
        dadosDiretores.id_sexo == ''                    || dadosDiretores.id_sexo == undefined     ||    dadosDiretores.id_sexo.length > 1        || 
        dadosDiretores.id_nacionalidade == ''           || dadosDiretores.id_nacionalidade == undefined     ||    dadosDiretores.id_nacionalidade.length > 1         
        
    ){
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        // Variável para validar se poderemos chamar o DAO para inserir os dados
       
        // Validação de digitação para a data de relançamento que não é campo obrigatório
        if( dadosDiretores.data_falecimento != null &&
            dadosDiretores.data_falecimento != undefined && 
            dadosDiretores.data_falecimento != '' &&
            dadosDiretores.data_falecimento.length > 10
        ){
         
            return message.ERROR_REQUIRED_FIELDS

        }
        // Validação para verificar se podemos encaminhar os dados para o DAO
      

        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novoDiretor = await diretorDAO.insertDiretor(dadosDiretores);

        let idSelect = await diretorDAO.selectByIdDiretor();

        dadosDiretores.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novoDiretor){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultDadosDiretor.status = message.SUCCESS_CREATED_ITEM.status;
            resultDadosDiretor.status_code = message.SUCCESS_CREATED_ITEM.status_code;
            resultDadosDiretor.message = message.SUCCESS_CREATED_ITEM.message;
            resultDadosDiretor.diretores = dadosDiretores;

            return resultDadosDiretor; // 201
        } else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
            
    
         }
       }
    }else{
        return message.ERROR_CONTENT_TYPE // 415 Erro no content type
    }
}catch(error){
    console.log(error)
    return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de aplicação
}
     
}


module.exports = {
    getListarDiretores,
    getBuscarDiretor,
    setExcluirDiretor,
    setInserirNovoDiretor
}
