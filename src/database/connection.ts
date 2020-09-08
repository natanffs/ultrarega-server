import knex from 'knex'

const connection = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        //port: 3308,
        user: 'root',
        password: '',
        database: 'ultrarega_dev'
    }
})

export default connection