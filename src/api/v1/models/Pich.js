const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const PichSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true
  },
  locationId: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  image: [{
    type: String,
    required: true
  }],
  rent: {
    type: Number,
    required: true
  },
  free: {
    type: Boolean,
    default: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    default: false,
    required: true
  },
  preview: {
    type: String,
    required: true
  }
});

PichSchema.plugin(idValidator, {
  message: "Bad ID value for {PATH}"
});

const Pich = mongoose.model('Pich', PichSchema);

module.exports = Pich;