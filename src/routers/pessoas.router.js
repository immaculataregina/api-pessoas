'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pessoas.controller');

// Cadastrar novo usuário
router.post('/', controller.cadastrarPessoa)

router.post('/verifica-cpf', controller.verificarCpf)

router.post('/atualizar-foto/:idPessoa', controller.atualizarFoto)

router.get('/dados-modulos/:idPessoa', controller.buscarDadosModulos)

module.exports = router;