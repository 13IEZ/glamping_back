const mongoose = require('mongoose');
const fixApply = require('./fixtures-code');
const config = require('./config');

mongoose.connect(config.getDbUrl(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

fixApply(db);
