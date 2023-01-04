'use strict'

require('dotenv').config();
// const Error = require('../utils/errors');

const PessoasModel = require('../models/pessoas.model');
const axios = require('axios');

exports.cadastrarPessoa = async (req, res) => {

    const schema = req.headers.schema

    const nomeCompleto = req.body.nomeCompleto
    const apelido = req.body.apelido
    const idPerfilPessoa = req.body.idPerfilPessoa
    const dtNascimento = req.body.dtNascimento
    const cpf = req.body.cpf
    const idEndereco = req.body.idEndereco || null
    const email = req.body.email || null
    const senha = req.body.senha || null

    try {
        // Insere a pessoa
        const objInsert = {
            nomeCompleto,
            apelido,
            idPerfilPessoa,
            dtNascimento,
            cpf,
            idEndereco,
            email
        }
        await PessoasModel.cadastrar(
            objInsert,
            schema
        )

        // Insere o usuário chamando api-autenticacao
        const bodyAutenticacao = {
            email,
            senha
        }

        await axios.post(
            `${process.env.API_AUTENTICACAO}/usuario`,
            bodyAutenticacao,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        res.status(200).json({ message: 'Pessoa cadastrada com sucesso!' })

    } catch (error) {
        res.status(500).json({ error })
    }


}