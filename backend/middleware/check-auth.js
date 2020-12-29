const jwt = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = async (req, res , next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.secretOrKey);
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    req.user = await User.findById(req.userData.userId)
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Authorization failed'
    });
  }
}
