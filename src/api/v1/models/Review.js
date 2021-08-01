const mongoose = require('mongoose');
const idValidator = require("mongoose-id-validator");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  pros: {
    type: String
  },
  cons: {
    type: String
  },
  review: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
});

ReviewSchema.plugin(idValidator, {
  message: "Bad ID value for {PATH}"
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;