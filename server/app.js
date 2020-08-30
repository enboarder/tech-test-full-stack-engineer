const dbPool = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//any entry without id is handled
app.get("/landingpad/", async (req, res) => {
  res.status(422);
  res.send("Invalid Id supplied");
});
//landing pad with landing id
app.get("/landingpad/:landingPadId", async (req, res) => {
  const { landingPadId } = req.params;
  let selectRows = [];
  let landingPad;
  //checks if db contains an entry
  try {
    selectRows = await dbPool.query(
      `SELECT * FROM spaceData where id='${landingPadId}'`
    );
  } catch (error) {
     res.status(error.status);
      res.send(error.message);
  }
  if (selectRows.length) {
    landingPad = JSON.parse(selectRows[0].spaceItem);
  } else {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/landpads/${landingPadId}`
      );
      landingPad = await response.json();
      await dbPool.query("INSERT INTO spaceData SET ?", {
        id: landingPadId,
        spaceItem: JSON.stringify(landingPad),
      });
    } catch (error) {
      res.status(error.status);
      res.send(error.message);
    }
  }
  res.status(200);
  const { id, full_name, status, location } = landingPad;
  res.send({ id, full_name, status, location }
  );
});
app.get("/capsule", async (req, res) => {
  try {
    // The following seems to fail at times, hence unable to implement sort
    // "https://api.spacexdata.com/v3/capsules?sort=original_launch"
     
    const response = await fetch(
      "https://api.spacexdata.com/v3/capsules"
    );
    const capsules = await response.json();

    res.status(200);
    res.send(capsules);
  } catch (error) {
    res.status(error.status);
    res.send(error.message);
  }
});
app.listen("4000");
console.log(
  `Listening on port: 4000, wait for the development server to be up...`
);
