const { createPool } = require('mysql2/promise');

const pool = createPool({
  host: 'localhost',
  port: 3306, // master
  user: 'user',
  password: 'password',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = {
    pool
}