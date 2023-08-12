require('dotenv').config();
const helmet = require('helmet');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var cors = require('cors')
const api = require('../api/index');
const express =require('express');
const bodyParser = require('body-parser');

const app = express();

//setting HTTP response headers
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// logger
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('combined'));

// var whitelist = process.env.ORIGIN;
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log(`${origin} ---- $[whitelist}`)
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
 
// app.use(cors(corsOptions));
app.use(cors());
app.use(`/api/${process.env.API_VERSION}`, api);
api.get('/', (req, res) => res.send('Not Found'));

module.exports = app;