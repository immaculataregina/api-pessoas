'use strict';

const express = require('express');
const config = require('../config');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send({
		api: config.name,
		environment: config.nodeEnv,
		version: config.version
	});
});

module.exports = router;