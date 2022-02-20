require('dotenv').config();
const jwt = require('jsonwebtoken');
const { authError } = require('../utils/errorConstant');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { jwtDevSecret } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : jwtDevSecret}`);
  } catch (err) {
    throw new UnauthorizedError({ message: authError.unauthorized.NOTOKEN_MESSAGE });
  }
  req.user = payload;

  next();
};

module.exports = auth;
