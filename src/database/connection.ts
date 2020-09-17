import knex from 'knex'

const connection = knex({
    client: 'mysql2',
    connection: {
        host: '192.185.210.204',
        user: 'ultra572_utr',
        password: '@utr-eqpto',
        database: 'ultra572_rega'
    }
})

// const connection = knex({
//     client: 'mysql2',
//     connection: {
//         host: 'localhost',
//         port: 3308,
//         user: 'root',
//         password: '',
//         database: 'ultrarega_dev'
//     }
// })

export default connection