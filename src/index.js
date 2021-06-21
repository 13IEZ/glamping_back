const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../config');
const app = express();

const port = 8000;

const users = require('./api/v1/routes/users');

const run = async () => {
  await mongoose.connect(config.getDbUrl(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));

  app.use('/users', users());

  app.listen(port, () => {
    console.log('Server started at http://localhost' + port);
  });
};

run().catch(e => console.log(e));
