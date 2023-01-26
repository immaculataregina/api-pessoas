const pg = require('pg');
const config = require('../config');


exports.executar = async (sql) => {
    try {
        const conn = new pg.Client(config.dbConnectionString);
        conn.connect();
        const result = await conn.query(sql + ' returning *')

        await conn.end();
        return result.rows
    } catch (e) {
        throw new Error(e);
    }
}

exports.buscar = async (sql) => {
    try {
        const conn = new pg.Client(config.dbConnectionString);
        conn.connect();
        const result = await conn.query(sql)

        await conn.end();
        return result.rows
    } catch (e) {
        throw new Error(e);
    }
}