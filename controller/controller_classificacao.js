/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const classificacaoDAO = require('../model/DAO/classificacao.js')

const setInserirNovaClassificacao = async function(dadosClassificacao, content){

    try{

        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let novaClassificacaoJson = {}

            if (dadosClassificacao.faixa_etaria == '' || dadosClassificacao.faixa_etaria == undefined || dadosClassificacao.faixa_etaria == null || dadosClassificacao.faixa_etaria.length > 2 ||
                dadosClassificacao.classificacao == ''|| dadosClassificacao.classificacao == undefined || dadosClassificacao.classificacao == null || dadosClassificacao.classificacao.length > 100 ||
                dadosClassificacao.caracteristica == ''|| dadosClassificacao.caracteristica == undefined || dadosClassificacao.caracteristica == null || dadosClassificacao.caracteristica.length > 100 ||
                dadosClassificacao.icone == ''|| dadosClassificacao.icone == undefined || dadosClassificacao.icone == null || dadosClassificacao.icone > 300){
                    return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }

            if(statusValidate){

                let novaClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao)

                console.log(novaClassificacao)
                if(novaClassificacao){
                    novaClassificacaoJson.status = message.SUCCESS_CREATED_ITEM.status
                    novaClassificacaoJson.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novaClassificacaoJson.message = message.SUCCESS_CREATED_ITEM.message
                    novaClassificacaoJson.classificacao = dadosClassificacao

                    return novaClassificacaoJson
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

const setAtualizarClassificacao = async function(id, dadosClassificacao, content){

    try{

        if(String(content).toLowerCase() == 'application/json'){

        let statusValidate = false
        let classificacaoAtualizadaJson = {}

        if (dadosClassificacao.faixa_etaria == '' || dadosClassificacao.faixa_etaria == undefined || dadosClassificacao.faixa_etaria == null || dadosClassificacao.faixa_etaria.length > 2 ||
                dadosClassificacao.classificacao == ''|| dadosClassificacao.classificacao == undefined || dadosClassificacao.classificacao == null || dadosClassificacao.classificacao.length > 100 ||
                dadosClassificacao.caracteristica == ''|| dadosClassificacao.caracteristica == undefined || dadosClassificacao.caracteristica == null || dadosClassificacao.caracteristica.length > 100 ||
                dadosClassificacao.icone == ''|| dadosClassificacao.icone == undefined || dadosClassificacao.icone == null || dadosClassificacao.icone > 300){
                    return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }
            if(statusValidate){

                let idClassificacao = id
                let classificacaoAtualizada = await classificacaoDAO.updateClassificacao(idClassificacao, dadosClassificacao)

                console.log(classificacaoAtualizada)
                if(classificacaoAtualizada){

                    classificacaoAtualizadaJson.status = message.SUCCESS_UPDATED_ITEM.status,
                    classificacaoAtualizadaJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code,
                    classificacaoAtualizadaJson.message = message.SUCCESS_UPDATED_ITEM.message,
                    classificacaoAtualizadaJson.idClassificacaoAtualizada = idClassificacao,
                    novaClassificacaoJson = dadosClassificacao

                    return classificacaoAtualizadaJson
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

const setExcluirClassificacao = async function(id){

    try{

        let idClassificacao = id;

        let validaClassificacao = await getBuscarClassificacao(idClassificacao);

        let dadosClassificacao = await classificacaoDAO.deleteClassificacao(idClassificacao);

        if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
            return message.ERROR_INVALID_ID

        }else if(validaClassificacao.status == false){
            return message.ERROR_NOT_FOUND

        }else{
            if(dadosClassificacao)
            return message.SUCCESS_DELETED_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarClassificacao = async function(){

    let classificacaoJSON = {};
    let dadosClassificacao = await classificacaoDAO.selectAllClassificacoes();

    if(dadosClassificacao){
        classificacaoJSON.classificacao = dadosClassificacao;
        classificacaoJSON.quantidade = dadosClassificacao.length;
        classificacaoJSON.status_code = 200;

        return classificacaoJSON;
    }else{
        return false;
    }
}

const getBuscarClassificacao = async function(id){

    let idClassificacao = id;
    let classificacaoJSON = {};

    if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID;
    }else{

        let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao);

        if(dadosClassificacao){
            if  (dadosClassificacao.length > 0){
                classificacaoJSON.classificacao = dadosClassificacao;
                classificacaoJSON.status_code = 200;

                return classificacaoJSON
            }else{
                return message.ERROR_NOT_FOUND;
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getListarClassificacao,
    getBuscarClassificacao
}