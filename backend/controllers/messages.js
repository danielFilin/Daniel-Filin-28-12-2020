const Message = require('../models/message');

const validateMessageInput = require('../validation/message');

exports.addMessage = async (req, res) => {

  const { errors, isValid} = validateMessageInput(req.body);

  if (!isValid) {
      return res.status(400).json(errors);
  }
  try {
    const message = new Message({
      subject: req.body.subject,
      content: req.body.content,
      date: req.body.date,
      senderId: req.body.senderId,
      recieverId: req.body.recieverId,
      creatorId: req.userData.userId
    })
    message.save();
    res.status(200).json({
      message: 'message was added',
   })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'adding message failed'
     })
  }
}

exports.getMessages = async (req, res) => {
  try {
    console.log(req.userData)
    let messages = await Message.find().where('creatorId').equals(req.userData.userId);
    console.log(messages);
    if (messages.length < 0) {
      res.status(201).json({
        message: 'no messages found'
      })
    }

    res.status(200).json({
      message: 'see message list',
      body: messages
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
    deleteResult = await Message.deleteOne({_id: req.params.id, creatorId: req.userData.userId});
    if (deleteResult.n > 0) {
      res.status(201).json({
        message: 'message was deleted',
      })
    }
    // else {
    //   throw new Error('User does not have a permission to delete this post');
    // }
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'Messaged was not deleted'
     })
  }
}
