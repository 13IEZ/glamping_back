const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const FactorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

FactorySchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}',
});

const Factory = mongoose.model('Factory', FactorySchema);

module.exports = Factory;
