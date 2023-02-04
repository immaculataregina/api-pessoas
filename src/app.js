'use strict';

const indexRouter = require('./routers/index.router');
const dizimoRouter = require('./routers/dizimo.router');
const app = require('./init.app');

// Router
app.use('/', indexRouter);
app.use('/dizimo', dizimoRouter);

module.exports = app;