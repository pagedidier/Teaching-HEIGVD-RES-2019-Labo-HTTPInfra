require('dotenv').config();
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');

const Chance = require('chance');

const chance = new Chance();

const configFile = require('./config/config.json');

const environment = process.env.NODE_ENV || 'dev';
const config = configFile[environment];


const { port } = config;

const app = express();

app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.use(cors());


app.get('/api/meteo', (req, res) => {
  const data = [];
  for (let i = 0; i < 10; i += 1) {
    const cityname = chance.city();
    const citylat = chance.latitude();
    const citylong = chance.longitude();

    const city = {
      cityname,
      citylat,
      citylong,
    };
    const weekMeteo = [];
    for (let j = 0; j < 7; j += 1) {
      const temperature = chance.integer({ min: 0, max: 40 });
      const precipitation = chance.integer({ min: 0, max: 10 });
      weekMeteo.push({ temperature, precipitation });
    }
    const elem = {
      city,
      weekMeteo,
    };

    data.push(elem);
  }
  res.json(data);
});

app.use((req, res, next) => {
  next(createError(404));
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: true, message: error.message });
});


app.listen(port);
module.exports = app;
