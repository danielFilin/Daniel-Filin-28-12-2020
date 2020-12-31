const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateUserInput = require('../validation/user');

exports.signupUser = async (req, res) => {
  const { errors, isValid} = validateUserInput(req.body);
  if (!isValid) {
      return res.status(400).json(errors);
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    password: hash
  });
  try {
    const result = await user.save();
    res.status(201).json({
      message: 'User was created',
      result: result
    })
  } catch (err) {
    res.status(500).json({
      err: err,
      message: 'User was not created!'
    })
  }

}

exports.loginUser = async (req, res) => {
  console.log('Daniel');
  const { errors, isValid} = validateUserInput(req.body);
  console.log(errors, isValid)
  if (!isValid) {
      return res.status(400).json({
        errors: errors,
      });
  }
  try {
    const logedUser = await User.findOne({email: req.body.email});
    if (!logedUser) {
      throw new Error ('user with such an email does not exist in the system');
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, logedUser.password);
    if (!isPasswordCorrect) {
      throw new Error ('The user entered an invalid password');
    }
    let token = jwt.sign({email: logedUser.email, userId: logedUser._id}, keys.secretOrKey, {expiresIn: '1h'});

    res.status(200).json({
      message: 'user logged in',
      token: token,
      expiresIn: 3600,
      userId: logedUser._id
   })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'login failed'
     })
  }
}
