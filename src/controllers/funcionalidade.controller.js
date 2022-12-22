'use strict'

const config = require('../config');
const Error = require('../utils/errors');

const FuncionalidadeModel = require('../models/funcionalidade.model');

exports.cadastrarFuncionalidade = async (req, res) => {
    const titulo = req.body.titulo
    const chave = req.body.chave

    try {
        const objInsert = {
            titulo,
            chave,
            usuCadastro: 0,
            dtCadastro: new Date(),
        }
        const item = await FuncionalidadeModel.cadastrar(
            objInsert
        );
        //console.log(item)
        res.status(200).json({ result: true, item })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}