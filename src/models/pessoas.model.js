'use strict';

const db = require('../utils/db');


exports.cadastrar = async (objInsert, schema) => {
	try {

		const query =
			`
			INSERT INTO ${schema}.pessoas
			(nome_completo, apelido, id_perfil_pessoa, dt_nascimento, cpf, id_endereco, email)
			VALUES
			('${objInsert.nomeCompleto}', 
				'${objInsert.apelido}', 
				${objInsert.idPerfilPessoa}, 
				'${objInsert.dtNascimento}', 
				'${objInsert.cpf}', 
				${objInsert.idEndereco}, 
				'${objInsert.email}'
			)
			`;

		console.log(query)

		const output = await db.executar(query);
		return output[0];
	} catch (e) {
		throw new Error(e);
	}
}