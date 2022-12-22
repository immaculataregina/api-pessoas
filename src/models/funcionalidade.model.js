'use strict';

const db = require('../utils/db');
const store = require('store');


exports.cadastrar = async (objInsert) => {
	try {

		const query =
			`-- Aqui vai o script de inserção`;

		// let output = await db.find(query);

		return output[0];
	} catch (e) {
		throw new Error(e);
	}
}