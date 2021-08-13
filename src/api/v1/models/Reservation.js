const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  accommodation: {
    type: Schema.Types.ObjectId,
    ref: "Accommodation"
  },
  pich: {
    type: Schema.Types.ObjectId,
    ref: 'Pich',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
});

ReservationSchema.plugin(idValidator, {
  message: "Bad ID value for {PATH}"
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;