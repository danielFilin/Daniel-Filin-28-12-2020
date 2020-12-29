const mongoose = require('mongoose');
const uniqeuValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
});

userSchema.plugin(uniqeuValidator);

module.exports = mongoose.model('User', userSchema);
