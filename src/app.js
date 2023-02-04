'use strict';

const indexRouter = require('./routers/index.router');
const pessoasRouter = require('./routers/pessoas.router');
const app = require('./init.app');

// Router
app.use('/', indexRouter);
app.use('/pessoas', pessoasRouter);

module.exports = app;