/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const filmesDAO = require('../model/DAO/filme')

// Função para inserir um novo filme
const setInserirNovoFilme = async function(dadosFilme, content) {
    console.log('oi')
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novoFilmeJson = {}

            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.nome == null || dadosFilme.sinopse > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao > 9 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                if (dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined) {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        statusValidate = true
                    }
                } else {
                    statusValidate = true
                }
                if (statusValidate) {
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    console.log(novoFilme)
                    if (novoFilme) {

                        //let idFilme = await filmesDAO.getId()

                        novoFilmeJson.status = message.SUCCESS_CREATED_ITEM.status
                        novoFilmeJson.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoFilmeJson.message = message.SUCCESS_CREATED_ITEM.message
                        //novoFilmeJson.idNovoFilme = idFilme
                        novoFilmeJson.filme = dadosFilme

                        return novoFilmeJson
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }

}

// Função para atualizar um filme existente
const setAtualizarFilme = async function(id, novosDados, content) {
    try {
        // if (String(content).toLowerCase() !== 'application/json') {
        //     return ERROR_Messages.ERROR_INVALID_FORMAT
        // }

        // const errors = []

        if (!novosDados.nome || novosDados.nome === '' || novosDados.nome.length > 80 ||
            !novosDados.sinopse || novosDados.sinopse === '' || novosDados.sinopse.length > 65000 ||
            !novosDados.duracao || novosDados.duracao === '' || novosDados.duracao > 9 ||
            !novosDados.data_lancamento || novosDados.data_lancamento === '' || novosDados.data_lancamento.length !== 10 ||
            !novosDados.foto_capa || novosDados.foto_capa === '' || novosDados.foto_capa.length > 200 ||
            (novosDados.valor_unitario && (isNaN(novosDados.valor_unitario) || novosDados.valor_unitario.length > 8)) ||
            (novosDados.data_relancamento && novosDados.data_relancamento.length !== 10)
        ) {
            if (!novosDados.data_relancamento || novosDados.data_relancamento.length !== 10) {
                return message.ERROR_REQUIRED_FIELDS
            }
            return message.ERROR_REQUIRED_FIELDS
        }

        const idFilme = id
        const filmeAtualizado = await filmesDAO.updateFilme(idFilme, novosDados)

        if (filmeAtualizado) {
            let novoFilmeJson = {
                status: message.SUCCESS_UPDATED_ITEM.status,
                status_code: message.SUCCESS_UPDATED_ITEM.status_code,
                message: message.SUCCESS_UPDATED_ITEM.message,
                idFilmeAtualizado: idFilme,
                filme: novosDados
            }
            return novoFilmeJson
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_UPDATE_ITEM
    }
}

// Função para excluir um filme existente
const setExcluirFilme = async function(id){
    try {

        let idFilme = id

        let validaFilme = await getBuscarFilme(idFilme)

        let dadosFilme = await filmesDAO.deleteFilme(idFilme)

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {

            return message.ERROR_INVALID_ID 

        } else if(validaFilme.status == false){
            return message.ERROR_NOT_FOUND

        } else {
            
            if(dadosFilme)
                return message.SUCESS_DELETED_ITEM 
            else
                return message.ERROR_INTERNAL_SERVER_DB

        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


// Função para retornar todos os filmes do banco de dados
const getListarFilmes = async function () {

    // Cria objeto JSON
    let filmesJSON = {};

    // Chama a função do DAO para retornar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    // Validação para criar o JSON dos dados
    if (dadosFilmes) {
        // Cria JSON do retorno de dados
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;

        return filmesJSON;
    } else {
        return false;
    }

}

// Função para retornar o filtro de um filme pelo ID
const getBuscarFilme = async function (id) {

    let idFilme = id;
    let filmeJSON = {};

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID;
    } else {

        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme);

        if (dadosFilme) {
            if (dadosFilme.length > 0) {
                filmeJSON.filme = dadosFilme;
                filmeJSON.status_code = 200

                return filmeJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}
