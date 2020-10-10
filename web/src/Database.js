const pg = require('pg');


class Database {
    constructor() {
        this.client = new pg.Client({
            user: process.env.CUBEJS_DB_USER,
            host: process.env.CUBEJS_DB_HOST,
            database: process.env.CUBEJS_DB_NAME,
            password: process.env.CUBEJS_DB_PASS,
            port: process.env.CUBEJS_DB_PORT,
        });
        this.connection = this.client.connect();
    }

    async query(query, values) {
        await this.connection;
        return this.client.query(query, values);
    }
}

module.exports = Database;
