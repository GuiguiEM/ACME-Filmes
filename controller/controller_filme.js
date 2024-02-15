/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo DAO para manipular dados dos filmes
const filmesDAO = require('../model/DAO/filme')

// Função para inserir um novo filme
const setInserirNovoFilme = async function(){

}

// Função para atualizar um filme existente
const setAtualizarFilme = async function(){

}

// Função para excluir um filme existente
const setExcluirFilme = async function(){

}

// Função para retornar todos os filmes do banco de dados
const getListarFilmes = async function(){

    // Cria objeto JSON
    let filmesJSON = {};

    // Chama a função do DAO para retornar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes();

     // Validação para criar o JSON dos dados
    if(dadosFilmes){
        // Cria JSON do retorno de dados
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        
        return filmesJSON;
    } else{
        return false;
    }

}

// Função para retornar o filtro de um filme pelo ID
const getBuscarFilme = async function(){

}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}
