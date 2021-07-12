const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../config');
const app = express();

const locations = require('./api/v1/routes/locations');
const users = require('./api/v1/routes/users');
const modules = require('./api/v1/routes/modules');
const reviews = require('./api/v1/routes/reviews');

const fixApply = require('../fixtures-code');

const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB, PORT } = process.env;

let url;
let portVar;

if (MONGO_HOSTNAME) {
  url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
  portVar = PORT;
} else {
  url = config.getDbUrl();
  portVar = 8000;
}

const run = async () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    validateBeforeSave: false,
    useCreateIndex: true,
  });

  if (MONGO_HOSTNAME) fixApply(mongoose.connection);

  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));

  app.use('/locations', locations());
  app.use('/users', users());
  app.use('/modules', modules());
  app.use('/reviews', reviews());

  app.listen(portVar, () => {
    console.log(`Server started at http://localhost ${portVar}`);
  });
};

run().catch(e => {
  console.log(e);
});
