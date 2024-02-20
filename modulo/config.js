/*********************************************************************************************************
 * Objetivo: Arquivo responsável pelas variáveis globais do projeto, onde haverão mensagens, status_code e outros conteúdos para Projeto
 * Data: 20/03/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/


/************************************ Mensagens de Erro do Projeto *********************************** */

const ERROR_INVALID_ID            = {status: false, status_code: 400, message: 'O ID encaminhado ma requisição não é válido!!'}
const ERROR_NOT_FOUND             = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!!'}
const ERROR_INTERNAL_SERVER_DB    = {status: false, status_code: 500, message: 'Ocorreram erros no processamento do Banco de Dados. Contate o administrador da API!!'}



module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB
}