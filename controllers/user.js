const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { jwtDevSecret } = require('../utils/constants');
const { requestError } = require('../utils/errorConstant');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;

// возвращает информацию о пользователе
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: requestError.notFoundError.USER_MESSAGE });
    })
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch(next);
};

// создает пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(() => res.send({ email, name }))
    .catch((err) => {
      if (err.name === 'MongoServerError' || err.code === 11000) {
        throw new ConflictError({ message: requestError.conflictError.EMAIL_MESSAGE });
      }
    })
    .catch(next);
};

// обновление информации о пользователе
const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError({ message: requestError.notFoundError.USER_MESSAGE }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new BadRequestError({ message: requestError.BadRequestError.DATA_MESSAGE });
    })
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch(next);
};

// авторизация пользователя
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtDevSecret,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};

const logoutUser = (req, res) => {
  res.status(202).clearCookie('jwt').send('куки удален.');
};

module.exports = {
  getUser,
  createUser,
  loginUser,
  updateUser,
  logoutUser,
};
