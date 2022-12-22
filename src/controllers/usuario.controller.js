'use strict'

const config = require('../config');
const Error = require('../utils/errors');

const UsuarioModel = require('../models/usuario.model');

exports.cadastrarUsuario = async (req, res) => {
    const email = req.body.email
    const senha = req.body.senha
    const idsFuncionalidades = req.body.idsFuncionalidades

    try {
        const objInsert = {
            email,
            senha,
            idsFuncionalidades,
            usuCadastro: 0,
            dtCadastro: new Date(),
        }
        const item = await UsuarioModel.cadastrar(
            objInsert
        );
        //console.log(item)
        res.status(200).json({ result: true, item })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.autenticar = async (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    try {
        const objAuth = {
            email,
            senha
        }
        const item = await UsuarioModel.autenticar(
            objAuth
        );
        //console.log(item)
        res.status(200).json({ result: true, item })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}