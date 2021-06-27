const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
    default: 'user',
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: async value => {
        const user = await User.findOne({ email: value });
        if (user) return false;
      },
      message: 'This user is already registered',
    },
  },
  description: {
    type: String,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
