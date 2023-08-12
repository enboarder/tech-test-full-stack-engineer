require('dotenv').config();

const app = require('./config/express');
const ship = require('./services/shipService');
//const db = require('./config/mysql');

//db.authenticate();
ship.initialLoadData();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}, wait for the development server to be up...`);
});
