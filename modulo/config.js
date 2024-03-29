/*********************************************************************************************************
 * Objetivo: Arquivo responsável pelas variáveis globais do projeto, onde haverão mensagens, status_code e outros conteúdos para Projeto
 * Data: 20/03/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/


/************************************ Mensagens de Erro do Projeto *********************************** */

const ERROR_INVALID_ID            = {status: false, status_code: 400, message: 'O ID encaminhado ma requisição não é válido!!'}
const ERROR_REQUIRED_FILDS        = {status: false, status_code: 400, message: 'Existem campos obrigatórios wur não foram preenchidos ou ultrapassaram o limite de caracteres!!'}
const ERROR_NOT_FOUND             = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!!'}
const ERROR_INTERNAL_SERVER_DB    = {status: false, status_code: 500, message: 'Ocorreram erros no processamento do Banco de Dados. Contate o administrador da API!!'}
const ERROR_INTERNAL_SERVER       = {status: false, status_code: 500, message: 'Ocorreram erros no servidor Back-end na camada de serviços/negócios, portanto não foi possível processar a requisição, contate o administrador da API'}
const ERROR_CONTENT_TYPE          = {status: false, status_code: 415, message: 'O Content-Type da requisição não é suportado. Precisa ser enviado dados no formato application/json'}

/************************************ Mensagens de Sucesso do Projeto *********************************** */

const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'O item foi criado com sucesso no banco de dados!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FILDS,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INTERNAL_SERVER,
    ERROR_CONTENT_TYPE,
    SUCCESS_CREATED_ITEM
}