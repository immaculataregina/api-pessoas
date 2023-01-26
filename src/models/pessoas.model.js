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
				'${obj.usuario.idsFuncionalidades}',
				${obj.dados.idEstadoCivil},
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