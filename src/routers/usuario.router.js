'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');

// Cadastrar novo usuário
router.post('/', controller.cadastrarUsuario)

// Autenticar
router.post('/', controller.autenticar)

module.exports = router;