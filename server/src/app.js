const express = require('express');
const bodyParser = require('body-parser');
const shipsController = require('./controllers/shipController');
const shipService = require('./services/shipService');
const app = express();

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ships', shipsController.getShips);
app.post('/ships/upload/:shipId', shipsController.uploadShipImage);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  //Start the scheduled task to update the database and cache every 24 hours
  shipService.refreshDatabaseAndCacheEvery24Hours();
});
