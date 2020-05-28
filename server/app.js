const dbPool = require('./db');
const express =require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const baseUrl = 'https://api.spacexdata.com/v3';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (_req, res) => {
    const rows = await dbPool.query('SELECT * FROM spaceData');
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

app.get('/capsules', async (_req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    let data = '';

    https.get(baseUrl + '/capsules', (resp) => {
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send({
                result: JSON.parse(data)
            });
        });
    }).on("error", (err) => {
        res.send({
            result: "Error: " + err.message
        });
    });
});

app.get('/landpads', async (_req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send({
        result: "Error: please enter a launch pad id"
    });
});

app.get('/landpads/:id', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const { params: { id } } = req;

    const rows = await dbPool.query(`SELECT * FROM spaceData WHERE id = '${id}'`);

    if (rows.length === 0) {
        // no entry found, so need to get data from SpaceX API
        let data = '';
        https.get(`${baseUrl}/landpads/${id}`, (resp) => {
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const parsedData = JSON.parse(data);
                const { id, full_name, status, location } = parsedData;
                const newEntry = JSON.stringify({ full_name, status, location });

                dbPool.query(`INSERT INTO spaceData (id, spaceItem) VALUES ('${id}', '${newEntry}')`);
                res.send({
                    result: { id, full_name, status, location }
                });
            });
        }).on("error", (err) => {
            res.send({
                result: "Error: " + err.message
            });
        });
    } else {
        // Result found in DB, so sending that
        const { spaceItem, id } = rows[0];
        const { full_name, status, location } = JSON.parse(spaceItem);
        res.send({
            result: { id, full_name, status, location }
        });
    };
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);
