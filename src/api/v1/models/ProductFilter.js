const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const ProductFilterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  season: {
    type: String,
    enum: ['winter', 'summer', 'all'],
    required: true,
  },
  preview: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  roominess: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
  factoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Factory',
    required: true,
  },
  reviewsQuantity: {
    type: Number,
  },
});

ProductFilterSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}',
});

const ProductFilter = mongoose.model('ProductFilter', ProductFilterSchema);

module.exports = ProductFilter;
