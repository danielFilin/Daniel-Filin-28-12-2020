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
  messages: {
    sentMessages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true}],
    recievedMessages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true}]
  },
});

userSchema.plugin(uniqeuValidator);

module.exports = mongoose.model('User', userSchema);
