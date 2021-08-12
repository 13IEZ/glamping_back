const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const AccomodSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  pichId: {
    type: Schema.Types.ObjectId,
    ref: 'Pich',
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  //Цена для бронирования
  price: {
    type: String,
  },
  //Модуль убран, дача закрыта
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

AccomodSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}',
});

const Accomod = mongoose.model('Accomod', AccomodSchema);

module.exports = Accomod;
