const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const locations = require('./api/v1/routes/locations');
const users = require('./api/v1/routes/users');
const modules = require('./api/v1/routes/modules');
const reviews = require('./api/v1/routes/reviews');

const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB, PORT } = process.env;

let portVar;
if (MONGO_HOSTNAME) portVar = PORT;
else portVar = 85;

const url = `mongodb://${MONGO_HOSTNAME ?? 'localhost'}:${MONGO_PORT}/${MONGO_DB}`;

const run = async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    validateBeforeSave: false,
    useCreateIndex: true,
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));

  app.use('/locations', locations());
  app.use('/users', users());
  app.use('/modules', modules());
  app.use('/reviews', reviews());

  app.listen(portVar, () => {
    console.log('Server started at http://localhost' + portVar);
  });
};

run().catch(e => console.log(e));
