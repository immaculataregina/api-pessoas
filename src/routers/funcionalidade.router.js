'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/funcionalidade.controller');

// Cadastrar novo perfil
router.post('/', controller.cadastrarFuncionalidade)

module.exports = router;