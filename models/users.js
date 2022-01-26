const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const { validationError, authError } = require('../utils/errorConstant');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: (email) => isEmail(email),
    message: validationError.validation.EMAIL_MESSAGE,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
    select: false,
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function authorizationUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError({ message: authError.unauthorized.LOGIN_MESSAGE });
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError({ message: authError.unauthorized.LOGIN_MESSAGE });
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
