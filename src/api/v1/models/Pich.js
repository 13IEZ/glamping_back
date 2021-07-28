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
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  locationId: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  roominess: {
    type: Number,
    required: true
  },
  season: {
    type: String,
    enum: ['winter', 'summer', 'all'],
    default: 'all',
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
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  }
});

PichSchema.plugin(idValidator, {
  message: "Bad ID value for {PATH}"
});

const Pich = mongoose.model('Pich', PichSchema);

pich.exports = Pich;