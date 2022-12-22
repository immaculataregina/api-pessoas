'use strict';

const indexRouter = require('./routers/index.router');
const usuarioRouter = require('./routers/usuario.router');
const usuarioRouter = require('./routers/funcionalidade.router');
const app = require('./init.app');

// Router
app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/funcionalidade', funcionalidadeRouter);

module.exports = app;