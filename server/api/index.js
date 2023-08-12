const express = require('express');
const shipRouter = require('./shipRouter');

const api = express.Router();

api.get('/status', (req, res) => res.send('OK'));

api.use('/ship', shipRouter);
api.use('/', (req, res) => res.send('Not Found'));

module.exports = api;