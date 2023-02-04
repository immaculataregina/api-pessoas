'use strict'

require('dotenv').config();
// const Error = require('../utils/errors');

const PessoasModel = require('../models/dizimo.model');
const axios = require('axios');

exports.cadastrarContribuicao = async (req, res) => {
    const schema = req.headers.schema;

    // Dados
    const idPessoa = req.params.idPessoa
    const idTipoContribuicao = req.body.idTipoContribuicao
    const idFormaPagamento = req.body.idFormaPagamento
    const valor = req.body.valor
    const diaVencimento = req.body.diaVencimento || null
    const dtInicio = req.body.dtInicio || null

    try {

       // Insere a contribuição
        const objInsert = {
            idPessoa,
            idTipoContribuicao,
            idFormaPagamento,
            valor,
            diaVencimento,
            dtInicio
        }

        await PessoasModel.cadastrarContribuicao(
            objInsert,
            schema
        )

        res.status(200).json({ message: 'Cadastro realizado com sucesso!' })

    } catch (error) {
        res.status(500).json({ error })
    }

}


exports.buscarDadosDashboard = async (req, res) => {

    const schema = req.headers.schema;
    let idPessoa = req.params.idPessoa;

    try {

        let dados = await PessoasModel.buscarDadosDashboard(
            schema,
            idPessoa
        )

        dados = dados[0]

        return res.status(200).json({ dados })

    } catch (error) {

        return res.status(500).json({ message: error })

    }
    
}