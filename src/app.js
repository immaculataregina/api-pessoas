'use strict';

const indexRouter = require('./routers/index.router');
const usuarioRouter = require('./routers/usuario.router');
const app = require('./init.app');

// Router
app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);

module.exports = app;