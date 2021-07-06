const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../config');
const app = express();
const swaggerUi = require('swagger-ui-express'),
      swaggerDocument = require('./swagger/openapi.json');

const port = 8000;

const locations = require('./api/v1/routes/locations');
const users = require('./api/v1/routes/users');
const modules = require('./api/v1/routes/modules');
const reviews = require('./api/v1/routes/reviews');

const run = async () => {
  await mongoose.connect(config.getDbUrl(), {
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

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.listen(port, () => {
    console.log('Server started at http://localhost' + port);
  });
};

run().catch(e => console.log(e));
