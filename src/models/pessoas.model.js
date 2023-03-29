'use strict';

const db = require('../utils/db');


exports.cadastrarPessoa = async (obj, schema) => {
	try {

		// Cadastrar pessoa
		const query =
			`
			INSERT INTO ${schema}.pessoas
			(nome_completo, 
				apelido, 
				id_perfil_pessoa, 
				dt_nascimento, 
				cpf, 
				id_endereco, 
				email,
				celular, 
				whatsapp, 
				uid, 
				ids_funcionalidades, 
				id_estado_civil, 
				filhos,
				id_sexo, 
				id_profissao, 
				id_grau_instrucao, 
				id_formacao, 
				id_pastoral
			)
			VALUES
			('${obj.dados.nomeCompleto}', 
				'${obj.dados.apelido}', 
				${obj.dados.idPerfilPessoa}, 
				'${obj.dados.dtNascimento}', 
				'${obj.dados.cpf}', 
				${obj.endereco.idEndereco}, 
				'${obj.contato.email}',
				'${obj.contato.celular}',
				${obj.contato.whatsapp},
				'${obj.usuario.uid}',
				'{${obj.usuario.idsFuncionalidades}}',
				${obj.dados.idEstadoCivil},
				${obj.dados.filhos},
				${obj.dados.idSexo},
				${obj.dados.idProfissao},
				${obj.dados.idGrauInstrucao},
				${obj.dados.idFormacao},
				${obj.vinculo.idPastoral}
			)
			`;
		const outputPessoa = await db.executar(query);
		
		// Vincular termo à pessoa
		const queryTermo =
			`
			INSERT INTO ${schema}.pessoa_termo
			(id_pessoa,
				id_termo,
				aceito
			)
			VALUES
			(${outputPessoa[0].id_pessoa}, 
				${obj.termo.idTermo},
				${obj.termo.aceito}
			)
			`;
		await db.executar(queryTermo);
		

		return outputPessoa[0];
	} catch (e) {
		throw new Error(e);
	}
}

exports.buscarPessoaPorCpf = async (cpf, schema) => {
	try {

		const query =
			`
			SELECT cpf 
			FROM ${schema}.pessoas
			WHERE cpf='${cpf}'
			`;

		const output = await db.buscar(query);
		return output;
	} catch (e) {
		throw new Error(e);
	}
}

exports.atualizarFoto = async (schema, fotoBase64, idPessoa) => {
	try {

		const query =
			`
			UPDATE ${schema}.pessoas
			SET foto = '${fotoBase64}'
			WHERE id_pessoa = ${idPessoa}
			`;
		
		await db.executar(query);
		
	} catch (e) {
		throw new Error(e);
	}
}

exports.buscarDadosModulos = async (schema, idPessoa) => {
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

exports.buscarPessoasListagem = async (schema, pagina) => {
	try {

		const query =
			`
			SELECT p.foto,
			p.id_pessoa,
			p.nome_completo,
			pt.descricao AS pastoral,
			p.celular
			FROM ${schema}.pessoas p
			LEFT JOIN pastorais pt
				ON pt.id_pastoral = p.id_pastoral
			ORDER BY p.nome_completo ASC 
			LIMIT 10 
			OFFSET ((${pagina} - 1) * 10);
			`;
		
		return await db.buscar(query);
		
	} catch (e) {
		throw new Error(e);
	}
}

exports.buscarPessoaDetalhe = async (schema, idPessoa) => {
	try {

		const query =
			`
			SELECT 
			EXTRACT(YEAR FROM AGE(CURRENT_DATE, p.dt_nascimento)) AS idade,
			p.dt_nascimento,
			sx.descricao AS sexo,
			ec.descricao AS estado_civil,
			p.filhos,
			pf.descricao AS profissao,
			gi.descricao AS grau_instrucao,
			f.descricao AS formacao,
			p.celular,
			p.email,
			pp.descricao AS perfil,
			'TO-DO' AS dizimista,
			'TO-DO' AS valor_mensal_doado
			FROM ${schema}.pessoas p
			LEFT JOIN sexo sx
				ON sx.id_sexo = p.id_sexo
			LEFT JOIN estado_civil ec
				ON ec.id_estado_civil = p.id_estado_civil
			LEFT JOIN profissoes pf
				ON pf.id_profissao = p.id_profissao
			LEFT JOIN pastorais pt
				ON pt.id_pastoral = p.id_pastoral
			LEFT JOIN grau_instrucao gi
				ON gi.id_grau_instrucao = p.id_grau_instrucao
			LEFT JOIN formacoes f
				ON f.id_formacao = p.id_formacao
			LEFT JOIN perfil_pessoa pp
				ON pp.id_perfil_pessoa = p.id_perfil_pessoa
			WHERE id_pessoa = ${idPessoa}
			`;
		
		return await db.buscar(query);
		
	} catch (e) {
		throw new Error(e);
	}
}