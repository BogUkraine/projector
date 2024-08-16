const mysql2 = require('mysql2');
const { pool } = require('./connection')

const executeQuery = async (query, values = []) => {
    let connection;
    const formattedQuery = mysql2.format(query, values);

    try {
      connection = await pool.getConnection();

      console.time('query')
      const [results, ] = await connection.execute(formattedQuery);
      console.log(results.affectedRows);
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      if (connection) connection.release();

      console.timeEnd('query')
    }
}

module.exports = {
    executeQuery
}