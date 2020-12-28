let messages = [];

const validateMessageInput = require('../validation/message');

exports.addMessage = async (req, res) => {

  const { errors, isValid} = validateMessageInput(req.body);

  if (!isValid) {
      return res.status(400).json(errors);
  }
  try {
    messages.push(req.body);
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
    console.log(req.params.id)
    const cleanedMessages = messages.filter((message) => message.date != req.params.id);
    messages = [...cleanedMessages];
    res.status(200).json({
      message: 'see message list',
      body: cleanedMessages
    })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'getting message list failed'
     })
  }
}
