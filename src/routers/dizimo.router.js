'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/dizimo.controller');

router.post('/nova-contribuicao/:idPessoa', controller.cadastrarContribuicao)

router.get('/busca-dashboard/:idPessoa', controller.buscarDadosDashboard)

module.exports = router;