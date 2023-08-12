const Sequelize = require('sequelize');
const env = require('dotenv');
env.config();

const {
  DB_HOST,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;