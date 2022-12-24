'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pessoas.controller');

// Cadastrar novo usuário
router.post('/', controller.cadastrarPessoa)

module.exports = router;