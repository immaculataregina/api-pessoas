'use strict'

require('dotenv').config();
// const Error = require('../utils/errors');

const PessoasModel = require('../models/pessoas.model');
const axios = require('axios');

exports.cadastrarPessoa = async (req, res) => {

    const schema = req.headers.schema

    // Dados
    const nomeCompleto = req.body.dados.nomeCompleto
    const apelido = req.body.dados.apelido
    const idPerfilPessoa = req.body.dados.idPerfilPessoa
    const dtNascimento = req.body.dados.dtNascimento
    const cpf = await formatCPF(req.body.dados.cpf)
    const idEstadoCivil = req.body.dados.idEstadoCivil
    const idSexo = req.body.dados.idSexo
    const idProfissao = req.body.dados.idProfissao
    const idGrauInstrucao = req.body.dados.idGrauInstrucao
    const idFormacao = req.body.dados.idFormacao

    // Endereço
    const cep = req.body.endereco.cep
    const logradouro = req.body.endereco.logradouro
    const idCidade = req.body.endereco.idCidade
    const numero = req.body.endereco.numero
    const complemento = req.body.endereco.complemento
    const bairro = req.body.endereco.bairro

    //  Vínculo paroquial
    const idPastoral = req.body.vinculo.idPastoral

    // Contato
    const celular = req.body.contato.celular
    const whatsapp = req.body.contato.whatsapp
    const email = req.body.contato.email || null

    // Usuario
    const senha = req.body.usuario.senha || null
    let uid = null;
    const idsFuncionalidades = req.body.usuario.idsFuncionalidades

    // Termos
    const idTermo = req.body.termo.idTermo
    const aceito = req.body.termo.aceito

    try {

        // Insere o usuário chamando api-autenticacao
        const bodyAutenticacao = {
            email,
            senha
        }
        
        const retornoAuth = await axios.post(
            `${process.env.API_AUTENTICACAO}/usuario`,
            bodyAutenticacao,
        {
        headers: {
            'Content-Type': 'application/json',
        }})

        uid = retornoAuth.data.user.uid;


        // Insere endereço
        const bodyEndereco = {
            cep,
            logradouro,
            idCidade,
            numero,
            complemento,
            bairro
        }

        const endereco = await axios.post(
            `${process.env.API_ENDERECOS}/enderecos`,
            bodyEndereco,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'schema': 'zdemo'
                }
            }
        )

        const idEndereco = endereco.data.novoEndereco.id_endereco

        // Insere a pessoa
        const objInsert = {
            dados: {
                nomeCompleto,
                apelido,
                idPerfilPessoa,
                dtNascimento,
                cpf,
                idEstadoCivil,
                idSexo,
                idProfissao,
                idGrauInstrucao,
                idFormacao
            },
            endereco: {
                idEndereco
            },
            vinculo: {
                idPastoral
            },
            contato: {
                celular,
                whatsapp,
                email
            },
            usuario : {
                uid,
                idsFuncionalidades
            },
            termo: {
                idTermo,
                aceito
            }
        }
        await PessoasModel.cadastrarPessoa(
            objInsert,
            schema
        )

        res.status(200).json({ message: 'Cadastro realizado com sucesso!' })

    } catch (error) {
        res.status(500).json({ error })
    }


}

exports.verificarCpf = async (req, res) => {

    const schema = req.headers.schema;

    let cpf = req.body.cpf;


    if (await isValidCPF(cpf)){

        // Verifica se o CPF já está cadastrado na base

        const retorno = await PessoasModel.buscarPessoaPorCpf(
        await formatCPF(cpf),
        schema
        )
            
        if (retorno.length > 0){
            return res.status(400).json({ message: `O CPF ${await formatCPF(cpf)} já possui cadastro no sistema.` })
        }

        return res.status(200).json({ message: `Permitido cadastrar o CPF ${await formatCPF(cpf)}.` })

    } else {
        return res.status(400).json({ message: `O CPF ${await formatCPF(cpf)} é inválido` })
    }

}

exports.atualizarFoto = async (req, res) => {

    const schema = req.headers.schema;

    let fotoBase64 = req.body.fotoBase64;
    let idPessoa = req.params.idPessoa;

    try {

        await PessoasModel.atualizarFoto(
            schema,
            fotoBase64,
            idPessoa
        )

    } catch (error) {

        return res.status(500).json({ message: error })

    }
    
    return res.status(200).json({ message: `Foto atualizada com sucesso!` })
}

exports.buscarDadosModulos = async (req, res) => {

    const schema = req.headers.schema;
    let idPessoa = req.params.idPessoa;

    try {

        let dados = await PessoasModel.buscarDadosModulos(
            schema,
            idPessoa
        )

        dados = dados[0]

        return res.status(200).json({ dados })

    } catch (error) {

        return res.status(500).json({ message: error })

    }
    
}

async function isValidCPF(cpf) {
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    } else
        return false;
}

async function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}