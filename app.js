const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
    app.use(cors)
    next()

})

app.get('/ACME-filmes/filmes', async(request, response, next) => {

    response.json(functions.listarFilmes())
    response.status(200)
})

app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})