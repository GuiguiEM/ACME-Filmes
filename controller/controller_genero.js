/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const generosDAO = require('../model/DAO/genero')

const setInserirNovoGenero = async function(dadosGenero, content) {

    try{
        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let novoGeneroJson = {}

            if(dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.length > 50){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }
            if(statusValidate){

                let novoGenero = await generosDAO.insertGenero(dadosGenero)

                console.log(novoGenero)
                if(novoGenero){

                    novoGeneroJson.status = message.SUCCESS_CREATED_ITEM.status
                    novoGeneroJson.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoGeneroJson.message = message.SUCCESS_CREATED_ITEM.message
                    novoGeneroJson.genero = dadosGenero

                    return novoGeneroJson
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarGenero = async function(id, dadosGenero, content) {

    try{

        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let generoAtualizadoJson = {}

            if(dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.length > 50){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }
            if(statusValidate){
                
                let idGenero = id
                let generoAtualizado = await generosDAO.updateGenero(idGenero, dadosGenero)

                console.log(generoAtualizado)
                if(generoAtualizado){
                    
                    generoAtualizadoJson.status = message.SUCCESS_UPDATED_ITEM.status,
                    generoAtualizadoJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code,
                    generoAtualizadoJson.message = message.SUCCESS_UPDATED_ITEM.message,
                    generoAtualizadoJson.idGeneroAtualizado = idGenero,
                    novoGeneroJson = dadosGenero

                    return generoAtualizadoJson
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirGenero = async function(id){
    
    try{

        let idGenero = id;

        let validaGenero = await getBuscarGenero(idGenero);

        let dadosGenero = await generosDAO.deleteGenero(idGenero);

        if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
            return message.ERROR_INVALID_ID

        } else if(validaGenero.status == false){
            return message.ERROR_NOT_FOUND

        }else{
            if(dadosGenero)
            return message.SUCCESS_DELETED_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarGeneros = async function(){

    let generoJSON = {};
    let dadosGeneros = await generosDAO.selectAllGeneros();

    if (dadosGeneros){
        generoJSON.generos = dadosGeneros;
        generoJSON.quantidade = dadosGeneros.length;
        generoJSON.status_code = 200;

        return generoJSON;
    }else{
        return false;
    }
}

const getBuscarGenero = async function(id){

    let idGenero = id;
    let generoJSON = {};

    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID;
    } else {

        let dadosGenero = await generosDAO.selectByIdGenero(idGenero);

        if(dadosGenero){
            if (dadosGenero.length > 0){
                generoJSON.genero = dadosGenero;
                generoJSON.status_code = 200

                return generoJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    getListarGeneros,
    getBuscarGenero,
    setExcluirGenero
}

