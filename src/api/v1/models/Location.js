const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  square: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  electrocity: {
    type: Boolean,
    default: true,
    required: true
  },
  water: {
    type: Boolean,
    default: true,
    required: true
  },
  road: {
    type: Boolean,
    default: true,
    required: true
  },
  published: {
    type: Boolean,
    default: false,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

LocationSchema.plugin(idValidator, {
  message: "Bad ID value for {PATH}"
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;