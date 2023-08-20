import dbPool from './db.js';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (req, res) => {
    const rows = await dbPool.query('SELECT * FROM spaceData');
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

/*  ADD YOUR APPLICATION ROUTES HERE
    ---
    Consider using best practice when structuring your routes,
    You may want to put application code into other files
*/

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);
