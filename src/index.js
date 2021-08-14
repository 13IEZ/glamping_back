const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../config');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/openapi.json');

const reservations = require('./api/v1/routes/reservations');
const categories = require('./api/v1/routes/categories');
const factories = require('./api/v1/routes/factories');
const locations = require('./api/v1/routes/locations');
const users = require('./api/v1/routes/users');
const products = require('./api/v1/routes/products');
const reviews = require('./api/v1/routes/reviews');
const accommodations = require('./api/v1/routes/accommodations');
const piches = require('./api/v1/routes/piches');

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
    useCreateIndex: true,
  });

  if (MONGO_HOSTNAME) fixApply(mongoose.connection);

  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));

  app.use('/reservations', reservations());
  app.use('/piches', piches());
  app.use('/categories', categories());
  app.use('/factories', factories());
  app.use('/locations', locations());
  app.use('/users', users());
  app.use('/products', products());
  app.use('/reviews', reviews());
  app.use('/accommodations', accommodations());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(portVar, () => {
    console.log(`Server started at http://localhost ${portVar}`);
  });
};

run().catch(e => {
  console.log(e);
});
