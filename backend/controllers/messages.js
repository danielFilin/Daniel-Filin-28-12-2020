const Message = require('../models/message');
const { findById } = require('../models/user');
const User = require('../models/user');
const validateMessageInput = require('../validation/message');

exports.addMessage = async (req, res) => {
  const { errors, isValid} = validateMessageInput(req.body);

  if (!isValid) {
      return res.status(400).json(errors);
  }
  const message = new Message({
    subject: req.body.subject,
    content: req.body.content,
    date: req.body.date,
    senderId: req.body.senderId,
    recieverId: req.body.recieverId,
    creatorId: req.userData.userId
  })
    try {
      console.log(req.body.recieverId, );
      let currentUser = await User.findById(req.userData.userId);
      let reciever = await User.findById(req.body.recieverId);
      currentUser.messages.sentMessages.push(message);
      reciever.messages.recievedMessages.push(message);
      currentUser.save();
      reciever.save();
      message.save();
      res.status(200).json({
        message: 'message was added',
     })
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'No user with the provided ID!',
     })
    }
}

exports.getMessages = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userData.userId);
    let userMessages = await currentUser.populate('messages.sentMessages').execPopulate();
    let recievedMessages = await currentUser.populate('messages.recievedMessages').execPopulate();
    if (userMessages.length < 0 && recievedMessages.length < 0) {
      res.status(201).json({
        message: 'no messages found'
      })
    }
    res.status(200).json({
      sentMessages : userMessages.messages,
      recievedMessages: recievedMessages.messages
    })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'getting message list failed'
     })
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    let updatedMessages;
    const currentUser = await User.findById(req.userData.userId);
    if (req.params.messageStatus === 'sent') {
      updatedMessages = currentUser.messages.sentMessages.filter(item => item._id != req.params.id)
      currentUser.messages.sentMessages = updatedMessages;
    } else {
      updatedMessages = currentUser.messages.recievedMessages.filter(item => item._id != req.params.id)
      currentUser.messages.recievedMessages = updatedMessages;
    }
    currentUser.save();
      res.status(201).json({
        message: 'message was deleted',
      })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'Messaged was not deleted'
     })
  }
}
