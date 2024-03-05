/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

/**********************************************
 * Para realizar a conexão com o Banco de Dados precisamos de uma biblioteca:
 * 
 *    - SEQUELIZE ORM (Biblioteca mais antiga)
 *    - PRISMA    ORM (Biblioteca mais atual)
 *    - FASTFY    ORM (Biblioteca mais atual)
 * 
 * Intalação do PRISMA ORM
 *      npm install 
 * 
 * Prisma - Para utilizar o prisma é necessário os comandos abaixos
 *     npm install prisma --save
 *     npm install @prisma/client --save
 *     
 * Para inicializar o prisma:
 *     npx prisma init
 * 
 *******************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors)
    next()

});

//Cria um objeto para definir o tipo de dados que irá chegar no BODY (JSON)
const bodyParserJSON = bodyParser.json();

/******************************************** Import dos arquivos internos do projeto ******************************/

const controllerFilmes = require('./controller/controller_filme.js')

/***************************************************************************************************************** */

// EndPoints: Retorna os dados do arquivo JSON
app.get('/v1/ACME-filmes/filmes', async(request, response, next) => {

    response.json(functions.listarFilmes())
    response.status(200)
})

// Endpoisnt: Retorna os dados do Banco de Dados
app.get('/v2/ACME-Filmes/filmes', cors(), async function(request, response, next){

    //Chama a função para retornar os dados de filme
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    // Validação para retornar os dados ou o erro e quando não houver dados
    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    } else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.get('/v2/ACME-Filmes/filme/:id', cors(), async function(request, response, next){

    let idFilme = request.params.id;

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);

})

app.post('/v2/ACME-Filmes/filme', cors(), bodyParser.json(), async function(request, response, next){

    let dadosBody = request.body;

    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody);

    response.status(resultDados.status_code);
    response.json(resultDados);
})

app.listen('3030', function(){
    console.log('API FUNCIONANDO')
})