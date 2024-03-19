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
const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false;
            let novoFilmeJSON = {};

            if (dadoFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length != 200 ||
                dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
            ) {
                return message.ERROR_REQUIRED_FILDS; //400
            } else {

                //Validação para verificar se a data de relançamento tem um conteúdo válido
                if (dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != undefined) {
                    //verifica a quantidade de caracter
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FILDS //400
                    } else {
                        statusValidated = true; //validação para a inserção dos dados no DAO
                    }
                } else {
                    statusValidated = true; //validação para a inserção dos dados no DAO
                }
                //Se a variavelfor verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {

                    //Encaminha os dados para DAO inserir
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme);

                    if (novoFilme) {
                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status;
                        novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message;
                        novoFilmeJSON = dadosFilme;

                        return novoFilmeJSON; //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB; //500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; //415 erro de content-type incorreto
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

// Função para atualizar um filme existente
const setAtualizarFilme = async function (id, dadosFilme, contentType) {

    try {

        let updateFilmeJSON = {};
        let idFilme = id;

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID;
        } else {

            if (String(contentType).toLowerCase() == 'application/json') {

                let statusValidated = false;
                let novoFilmeJSON = {};

                if (dadoFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                    dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                    dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                    dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                    dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length != 200 ||
                    dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
                ) {
                    return message.ERROR_REQUIRED_FILDS; //400
                } else {

                    //Validação para verificar se a data de relançamento tem um conteúdo válido
                    if (dadosFilme.data_relancamento != '' &&
                        dadosFilme.data_relancamento != null &&
                        dadosFilme.data_relancamento != undefined) {
                        //verifica a quantidade de caracter
                        if (dadosFilme.data_relancamento.length != 10) {
                            return message.ERROR_REQUIRED_FILDS //400
                        } else {
                            statusValidated = true; //validação para a inserção dos dados no DAO
                        }
                    } else {
                        statusValidated = true; //validação para a inserção dos dados no DAO
                    }
                    //Se a variavelfor verdadeira, podemos encaminhar os dados para o DAO
                    if (statusValidated) {

                        //Encaminha os dados para DAO inserir
                        let updateFilme = await filmesDAO.updateFilme(id, dadosFilme);

                        if (updateFilme) {
                            //Cria o JSON de retorno com informações de requisição e os dados novos
                            updateFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status;
                            updateFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                            updateFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message;
                            updateFilmeJSON = dadosFilme;

                            return updateFilmeJSON; //201
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB; //500
                        }
                    }
                }
            } else {
                return message.ERROR_CONTENT_TYPE; //415 erro de content-type incorreto
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

// Função para excluir um filme existente
const setExcluirFilme = async function () {

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
