'use strict'

require('dotenv').config();
const firebaseConfig = require('../utils/firebase');
// const Error = require('../utils/errors');

const UsuarioModel = require('../models/usuario.model');

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const { initializeApp } = require('firebase/app');
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

exports.cadastrarUsuario = async (req, res) => {

    const email = req.body.email
    const senha = req.body.senha
    const idsFuncionalidades = req.body.idsFuncionalidades
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            res.status(200).json({ result: true, user })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
            res.status(500).json({
                errorCode,
                errorMessage
            })
        });
}

exports.autenticar = async (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            res.status(200).json({ result: true, user })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
            res.status(500).json({
                errorCode,
                errorMessage
            })
        });
}