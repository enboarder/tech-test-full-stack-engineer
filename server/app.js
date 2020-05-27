const dbPool = require('./db');
const express =require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const baseUrl = 'https://api.spacexdata.com/v3'

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
    let data = '';

    https.get(baseUrl + '/capsules', (resp) => {
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send({
                result: data
            })
        });
    }).on("error", (err) => {
        res.send({
            result: "Error: " + err.message
        })
    });
});

app.get('/landpads/:id', async (req, res) => {
    const { params: { id } } = req;
    let data = '';

    https.get(`${baseUrl}/landpads/${id}`, (resp) => {
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send({
                result: data
            })
        });
    }).on("error", (err) => {
        res.send({
            result: "Error: " + err.message
        })
    });
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);