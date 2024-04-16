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

}

const setAtualizarGenero = async function(id, novosDados, content) {

    try{

        if(!novosDados.nome || novosDados.nome === '' || novosDados.nome.length > 20
        ){
            return message.ERROR_REQUIRED_FIELDS
        }

        const idGenero = id
        const generoAtualizado = await generosDAO.updateGenero(idGenero, novosDados)

        if(generoAtualizado){
            let novoGeneroJson = {
                status: message.SUCCESS_UPDATED_ITEM .status,
                status_code: message.SUCCESS_UPDATED_ITEM.status_code,
                message: message.SUCCESS_UPDATED_ITEM.message,
                idGeneroAtualizado: idGenero,
                genero: novosDados
            }
            return novoGeneroJson
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch(error){
        return message.ERROR_UPDATE_ITEM
    }
}

const setExcluirGenero = async function(id){

}

const getListarGeneros = async function(){

    let generosJSON = {};
    let dadosGeneros = await generosDAO.selectAllGeneros();

    if (dadosGeneros){
        generosJSON.generos = dadosGeneros;
        generosJSON.quantidade = dadosGeneros.length;
        generosJSON.status_code = 200;

        return generosJSON;
    }else{
        return false;
    }
}

module.exports = {
    getListarGeneros
}

