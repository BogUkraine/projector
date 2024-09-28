const { faker } = require('@faker-js/faker');
const { executeQuery } = require('./utils')
const { pool } = require('./connection');
const BATCH_NUMBER = process.env.INSERT_BATCH_NUMBER || 10000
const BATCH_SIZE = process.env.INSERT_BATCH_SIZE || 100

const sqlQuery = "INSERT INTO test_table (c_first, c_second, c_third, c_fourth) VALUES ?";

const generateValues = (batchSize) => {
    const values = [];

    for (let i = 0; i < batchSize; i++) {
        values.push([
            faker.internet.userName(),
            faker.number.int({ max: 999999 }),
            faker.number.float(),
            faker.number.int({ max: 999999 }),
        ]);
    }

    return [values];
}

(async () => {
    console.time('INSERT')
    console.log(0)
    for (let i = 0; i < BATCH_NUMBER; i++) {
        const values = generateValues(BATCH_SIZE);
        await executeQuery(sqlQuery, values)
    }
    console.log(14)
    console.timeEnd('INSERT')
    await pool.end()
})()