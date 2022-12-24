'use strict'

require('dotenv').config();
// const Error = require('../utils/errors');

const PessoasModel = require('../models/pessoas.model');

exports.cadastrarPessoa = async (req, res) => {

    const email = req.body.email
    const senha = req.body.senha
   
}