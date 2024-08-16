require('dotenv').config()
const { executeQuery } = require('./utils')
const { pool } = require('./connection');

const sqlQueryUsername = `
    SELECT * FROM users
    WHERE username LIKE "%?%"
    LIMIT 1000
`;

const sqlQueryDOB1 = `
    SELECT * FROM users
    WHERE date_of_birth = ?
    LIMIT 1000
`;

const sqlQueryDOB2 = `
    SELECT * FROM users
    WHERE date_of_birth > ?
    LIMIT 1000
`;

const sqlQueryDOB3 = `
    SELECT * FROM users
    WHERE date_of_birth < ?
    LIMIT 1000
`;

(async () => {
    console.log(sqlQueryUsername)
    await executeQuery(sqlQueryUsername, ['Sophia'])

    console.log(sqlQueryDOB1)
    await executeQuery(sqlQueryDOB1, [new Date('1963-05-03')])

    console.log(sqlQueryDOB2)
    await executeQuery(sqlQueryDOB2, [new Date('1963-05-03')])

    console.log(sqlQueryDOB3)
    await executeQuery(sqlQueryDOB3, [new Date('1963-05-03')])

    await pool.end()
})()