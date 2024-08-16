require('dotenv').config()
const { faker } = require('@faker-js/faker');
const { executeQuery } = require('./utils')
const { pool } = require('./connection');
const BATCH_NUMBER = process.env.INSERT_BATCH_NUMBER
const BATCH_SIZE = process.env.INSERT_BATCH_SIZE

const sqlQuery = "INSERT INTO users (username, password, email, date_of_birth) VALUES ?";

const generateValues = (batchSize) => {
    const values = [];

    for (let i = 0; i < batchSize; i++) {
        values.push([
            faker.internet.userName(),
            faker.internet.password(),
            `${faker.string.sample(10)}${faker.internet.email()}`,
            faker.date.birthdate()
        ]);
    }

    return [values];
}

(async () => {
    console.time('INSERT')
    for (let i = 0; i < BATCH_NUMBER; i++) {
        const values = generateValues(BATCH_SIZE);
        await executeQuery(sqlQuery, values)
    }
    console.timeEnd('INSERT')
    await pool.end()
})()