const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const AccommodationFilterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  pichId: {
    type: Schema.Types.ObjectId,
    ref: 'Pich',
    required: true
  },
  image: [{
    type: String,
    required: true
  }],
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  //rent price
  rent: {
    type: String,
    required: true
  },
  //Booked - false, free - true
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  //tourists's ID
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewsQuantity: {
    type: Number
  }
});

AccommodationFilterSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}',
});

const AccommodationFilter = mongoose.model('AccommodationFilter', AccommodationFilterSchema);

module.exports = AccommodationFilter;
