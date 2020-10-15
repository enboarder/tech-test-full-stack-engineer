const dbPool = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const SPACEX_API = "https://api.spacexdata.com/v3";
const LANDINGPAD_SERVICE = `${SPACEX_API}/landingPads`;
const ALL_CAPSULE_SERVICE = `${SPACEX_API}/capsules?sort=original_launch`;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//any entry without id is handled
app.get("/landingpad/", async (req, res) => {
  res.status(422);
  res.send(req.params.landingPadId);
});
//landing pad with landing id
app.get("/landingpad/:landingPadId", async (req, res) => {
  const { landingPadId } = req.params;

  //checks if db contains an valid row
  try {
    let landingPad;
    const selectRows = await dbPool.query(
      `SELECT * FROM spaceData where id='${landingPadId}'`
    );
    if (selectRows.length) {
      //data from db is considered
      landingPad = JSON.parse(selectRows[0].spaceItem);
    } else {
      const response = await axios.get(
        `${LANDINGPAD_SERVICE}/${landingPadId}`
      );
      landingPad = response.data;
      //data fetched from api inserted into db. saves entire response for maintainability
      const insertRow = await dbPool.query("INSERT INTO spaceData SET ?", {
        id: landingPadId,
        spaceItem: JSON.stringify(landingPad),
      });
    }
    res.status(200);
    //only required params resonded.
    const { id, full_name, status, location } = landingPad;
    res.send({ id, full_name, status, location });
  } catch (error) {
    res.status(500);
    const message = "Item not found";
    res.send({ error: true, message });
  }
});
app.get("/capsule", async (req, res, next) => {
  try {
    const response = await axios.get(ALL_CAPSULE_SERVICE);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500);
    const message = "Unable to fetch data";
    res.send({ error: true, message });
  }
});
app.listen("4000");
console.log(
  `Listening on port: 4000, wait for the development server to be up...`
);
