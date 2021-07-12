const mongoose = require('mongoose');
const fixApply = require('./fixtures-code');

mongoose.connect('mongodb://db:27017/glamping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

fixApply(db);
