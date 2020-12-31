const mongoose = require('mongoose');
const user = require('./user');

const Schema = mongoose.Schema;

const messageSchema = Schema({
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true,
  },
  recieverId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creatorId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User", required: true
    }
})

module.exports = mongoose.model('Message', messageSchema);

