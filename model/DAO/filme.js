/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();


// Função para inserir um filme no Banco de Dados
const insertFilme = async function(dadosFilme) {
    console.log('oi1')

    try {
        let sql

        if (dadosFilme.data_relancamento == null ||
            dadosFilme.data_relancamento == undefined ||
            dadosFilme.data_relancamento == '') {
            console.log('oi1')
            sql = `insert into tbl_filme (nome, 
                                        sinopse,
                                        duracao,
                                        data_lancamento,
                                        data_relancamento,
                                        foto_capa,
                                        valor_unitario
        ) values(
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.duracao}',
            '${dadosFilme.data_lancamento}',
            null,
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
        )`
        } else {
            console.log('oi2')
            sql = `insert into tbl_filme (nome, 
                                          sinopse,
                                          duracao,
                                          data_lancamento,
                                          data_relancamento,
                                          foto_capa,
                                          valor_unitario
                                    ) values(
                                    '${dadosFilme.nome}',
                                    '${dadosFilme.sinopse}',
                                    '${dadosFilme.duracao}',
                                    '${dadosFilme.data_lancamento}',
                                    '${dadosFilme.data_relancamento}',
                                    '${dadosFilme.foto_capa}',
                                    '${dadosFilme.valor_unitario}'
                                    )`
        }

        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

// Função para atualizar um filme no Banco de Dados
const updateFilme = async function (id, dadosFilme) {

    try{

        let sql

        if (dadosFilme.data_relancamento != '' &&
        dadosFilme.data_relancamento != null &&
        dadosFilme.data_relancamento != undefined
    ){

            sql = `UPDATE tbl_filme SET 
            nome = "${dadosFilme.nome}",
            sinopse = "${dadosFilme.sinopse}",
            duracao = '${dadosFilme.duracao}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            data_relancamento = '${dadosFilme.data_relancamento}',
            foto_capa = '${dadosFilme.foto_capa}',
            valor_unitario = '${dadosFilme.valor_unitario}'
            WHERE id = ${id}`
    } else {
        sql = `UPDATE tbl_filme SET 
        nome = "${dadosFilme.nome}",
        sinopse = "${dadosFilme.sinopse}",
        duracao = '${dadosFilme.duracao}',
        data_lancamento = '${dadosFilme.data_lancamento}',
        foto_capa = '${dadosFilme.foto_capa}',
        valor_unitario = '${dadosFilme.valor_unitario}'
        WHERE id = ${id}`
    }

    console.log(sql)
    
        let result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
    } catch (error){
        return false
    }
}

// Função para excluir um filme no Banco de Dados
const deleteFilme = async (id) => {

    try {
        let sql = `delete from tbl_filme where id = ${id}`

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes

    } catch (error) {
        return false
    }

}

// Função para retornar todos os filmes do Banco de Dados
const selectAllFilmes = async function () {
    let sql = 'select * from tbl_filme';

    /**
     * $queryRawlUnsafe()                     ---- Encaminha uma variável
     * $queryRaw('select * from tbl_filme')   ---- Encaminha direto o script
     */

    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    if (rsFilmes.length > 0)
        return rsFilmes;
    else
        return false
}

// Função para buscar um filme no Banco de Dados filtrando pelo ID
const selectByIdFilme = async function (id) {

    try {
        let sql = `select * from tbl_filme where id = ${id}`;

        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;

    } catch (error) {
        return false;
    }

}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}