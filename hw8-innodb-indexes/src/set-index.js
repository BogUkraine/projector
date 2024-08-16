require('dotenv').config()
const { faker } = require('@faker-js/faker');
const { executeQuery } = require('./utils')
const { pool } = require('./connection');
const INDEX_TYPE = process.env.INDEX_TYPE

const sqlBtree = "CREATE INDEX `dob_index` ON users (date_of_birth) USING BTREE";
const sqlHash = "CREATE INDEX `dob_index` ON users (date_of_birth) USING HASH";
const sqldropIndex = "DROP INDEX dob_index ON users";

(async () => {
    switch (INDEX_TYPE) {
        case 'BTREE': {
            console.log(sqlBtree)
            console.time('BTREE')
            await executeQuery(sqlBtree)
            console.timeEnd('BTREE')
            break;
        }
        case 'HASH': {
            console.log(sqlHash)
            console.time('HASH')
            await executeQuery(sqlHash)
            console.timeEnd('HASH')
            break;
        }
        case 'DROP': {
            console.log(sqldropIndex)
            console.time('DROP')
            await executeQuery(sqldropIndex)
            console.timeEnd('DROP')
            break;
        }
    }

    await pool.end()
})()