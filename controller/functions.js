var dadosFilmes = require('../modulo/APIfilmes')

const listarFilmes = () => {
    let filmes = dadosFilmes.filmes.filmes
    let filmesArray = []

    filmes.forEach((filme) => {
        let filmesInfo = {
            id: filme.id,
            nome: filme.nome,
            duracao: filme.duracao,
            data_lancamento: filme.data_lancamento
        }

        filmesArray.push(filmesInfo)

    })

    let filmesJSON = {filmesArray}
    return filmesJSON
}

console.log (listarFilmes())
