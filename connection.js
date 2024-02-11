const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'data_kepegawaian',
    port: 5432
})

module.exports = client