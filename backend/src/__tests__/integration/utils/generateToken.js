const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.generateToken = userId => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
