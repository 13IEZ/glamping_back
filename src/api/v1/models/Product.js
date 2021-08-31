const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
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
  rent: {
    type: String,
  },
  year: {
    type: Date,
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
    type: Number
  }
});

ProductSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}',
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
