'use strict';

const db = require('../utils/db');

exports.cadastrarContribuicao = async (obj, schema) => {
	try {

		// Cadastrar pessoa
		let query =
			`
			INSERT INTO ${schema}.dizimistas
			(
				id_pessoa,
				id_tipo_contribuicao,
				id_forma_pagamento,
				valor,
				dia_vencimento,
				dt_inicio,
				ativo,
				dt_cadastro
			)
			VALUES
			(
				${obj.idPessoa},
				${obj.idTipoContribuicao},
				${obj.idFormaPagamento},
				${obj.valor},
				${obj.diaVencimento},
				'${obj.dtInicio}',
				true,
				'${await formatDate(new Date())}'
			)
			`;

		query = query.replace("'null'", "null")

		return await db.executar(query);

	} catch (e) {
		throw new Error(e);
	}
}

exports.buscarDadosDashboard = async (schema, idPessoa) => {
	try {

		const query =
			`
			SELECT p.apelido,
			p.foto,
			STRING_AGG(im.titulo_menu, ', ') AS itens_menu
			FROM ${schema}.pessoas p
			INNER JOIN perfil_pessoa pp
			ON pp.id_perfil_pessoa = p.id_perfil_pessoa
			INNER JOIN itens_menu im
			ON im.id_item_menu = ANY(pp.ids_itens_menu)
			WHERE p.id_pessoa = ${idPessoa}
			GROUP BY p.apelido,
			p.foto
			`;
		
		return await db.buscar(query);
		
	} catch (e) {
		throw new Error(e);
	}
}

async function formatDate(date) {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }