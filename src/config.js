require('dotenv').config();

module.exports = {
    name: process.env.NAME,
    version: process.env.VERSION,
    nodeEnv: process.env.NODE_ENV,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
};