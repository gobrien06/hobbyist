require('dotenv').config({path: '../.env'});

const knex_config = {
    'development': {
        client: 'pg',
        connection: process.env.POSTGRES_TEST_URL
    },
    'deployment': {
        client: 'pg',
        connection: process.env.POSTGRES_URL
    }
}

var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(knex_config[env]);

module.exports = knex;