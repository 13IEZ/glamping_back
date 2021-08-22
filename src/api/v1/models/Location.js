const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  coords: {
    type: Array,
    required: true
  },
  image: [{
    type: String,
    required: true
  }],
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
  electricity: {
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
  },
  pool: {
    type: Boolean,
    default: false,
    required: true
  },
  biking: {
    type: Boolean,
    default: false,
    required: true
  },
  hiking: {
    type: Boolean,
    default: false,
    required: true
  },
  riding: {
    type: Boolean,
    default: false,
    required: true
  },
  yoga: {
    type: Boolean,
    default: false,
    required: true
  },
  motorbike: {
    type: Boolean,
    default: false,
    required: true
  },
  alpinism: {
    type: Boolean,
    default: false,
    required: true
  },
  trekking: {
    type: Boolean,
    default: false,
    required: true
  },
  tennis: {
    type: Boolean,
    default: false,
    required: true
  },
  cinema: {
    type: Boolean,
    default: false,
    required: true
  },
  fishing: {
    type: Boolean,
    default: false,
    required: true
  },
  aquapark: {
    type: Boolean,
    default: false,
    required: true
  },
  golf: {
    type: Boolean,
    default: false,
    required: true
  },
  volleyball: {
    type: Boolean,
    default: false,
    required: true
  },
  boardGames: {
    type: Boolean,
    default: false,
    required: true
  },
  diving: {
    type: Boolean,
    default: false,
    required: true
  },
  ramp: {
    type: Boolean,
    default: false,
    required: true
  },
  dogPlayground: {
    type: Boolean,
    default: false,
    required: true
  },
  nursery: {
    type: Boolean,
    default: false,
    required: true
  },
  fireplace: {
    type: Boolean,
    default: false,
    required: true
  },
  summerHouse: {
    type: Boolean,
    default: false,
    required: true
  },
  grill: {
    type: Boolean,
    default: false,
    required: true
  },
  wifi: {
    type: Boolean,
    default: false,
    required: true
  },
  laundry: {
    type: Boolean,
    default: false,
    required: true
  },
  sauna: {
    type: Boolean,
    default: false,
    required: true
  },
  sportsGround: {
    type: Boolean,
    default: false,
    required: true
  },
  playground: {
    type: Boolean,
    default: false,
    required: true
  },
  beach: {
    type: Boolean,
    default: false,
    required: true
  },
  indoorPoll: {
    type: Boolean,
    default: false,
    required: true
  },
  pharmacy: {
    type: Boolean,
    default: false,
    required: true
  },
  miniZoo: {
    type: Boolean,
    default: false,
    required: true
  },
  store: {
    type: Boolean,
    default: false,
    required: true
  },
  cafe: {
    type: Boolean,
    default: false,
    required: true
  },
  restaurant: {
    type: Boolean,
    default: false,
    required: true
  },
  parking: {
    type: Boolean,
    default: false,
    required: true
  }
});

LocationSchema.plugin(idValidator, {
  message: "Bad ID value for {PATH}"
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;