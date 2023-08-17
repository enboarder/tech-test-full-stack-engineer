import { createPool } from 'mysql2';

const {
    IS_DOCKER,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    DB_CONTAINER
} = process.env;

const host = IS_DOCKER ? DB_CONTAINER : 'localhost';

const pool = createPool({
    host,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
}).promise();

// Verify connection configuration
try {
    const connection = await pool.getConnection();
    connection.release();
} catch (err) {
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

export default pool;
