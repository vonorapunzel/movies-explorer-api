require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { jwtDevSecret } = require('../utils/constants');
const { requestError } = require('../utils/errorConstant');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

// возвращает информацию о пользователе
const getUser = (req, res, next) => {
  console.log(req, res);
  User.findById(req.user._id)
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
        next(new ConflictError({ message: requestError.conflictError.EMAIL_MESSAGE }));
      } else {
        next(err);
      }
    });
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
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'MongoServerError' || err.code === 11000) {
        next(new ConflictError({ message: requestError.conflictError.EMAIL_MESSAGE }));
      } else {
        next(err);
      }
    });
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
<<<<<<< HEAD
	  secure: true,
	  sameSite: 'None',
=======
          secure: true,
          sameSite: 'None',
>>>>>>> 44bf3ace59914f8ba838b47d91d71bc243ad9d0d
        })
        .send({ message: 'Успех!' });
    })
    .catch(next);
};

const logoutUser = (req, res) => {
<<<<<<< HEAD
  res.status(202).clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None',}).send({ message: 'куки удален.'});
=======
  res.status(202).clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, }).send({ success: 'куки удален.' });
>>>>>>> 44bf3ace59914f8ba838b47d91d71bc243ad9d0d
};

module.exports = {
  getUser,
  createUser,
  loginUser,
  updateUser,
  logoutUser,
};
