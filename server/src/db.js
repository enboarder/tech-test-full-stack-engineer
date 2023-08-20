const { createPool } = require('mysql');
const { promisify } = require('util');
const util = require('util');

const { IS_DOCKER, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const host = IS_DOCKER ? 'db' : 'localhost';

const pool = createPool({
  host,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) connection.release();
  return;
});

// Promisify the query method
pool.query = promisify(pool.query);
// Promisify the getConnection method
pool.getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

// Function to start a transaction
pool.beginTransactionAsync = async () => {
  const connection = await pool.getConnectionAsync();
  await util.promisify(connection.beginTransaction).bind(connection)();
  return connection;
};

module.exports = pool;
