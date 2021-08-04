const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const AccommodationSchema = new Schema({
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
   //Цена для бронирования
   rent: {
      type: String,
      required: true
   },
   //Модуль убран, дача закрыта
   status: {
      type: Boolean,
      default: true,
      required: true
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   preview: {
      type: String,
      required: true
   }
});

AccommodationSchema.plugin(idValidator, {
   message: "Bad ID value for {PATH}"
});

const Accommodation = mongoose.model('Accommodation', AccommodationSchema);

module.exports = Accommodation;