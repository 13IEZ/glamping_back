const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  image: [{
    type: String,
    required: true
  }],
  roominess: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  series: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  published: {
    type: Boolean,
    default: false,
    required: true
  },
  factory: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

ModuleSchema.plugin(idValidator, {
  message: "Bad ID value for {PATH}"
});

ModuleSchema.plugin(mongoosePaginate);

const Module = mongoose.model('Module', ModuleSchema);

Module.paginate().then({});
module.exports = Module;