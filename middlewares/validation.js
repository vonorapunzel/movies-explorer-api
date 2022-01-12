const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const { validationError } = require('../utils/errorConstant');
const ConflictError = require('../errors/ConflictError');

const validationURL = (value) => {
  const result = isURL(value);
  if (!result) throw new ConflictError({ message: validationError.invalid.URL_MESSAGE });
  return value;
};

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationURL),
    trailer: Joi.string().required().custom(validationURL),
    thumbnail: Joi.string().required().custom(validationURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateUpdateUser,
  validateMovie,
  validateDeleteMovie,
};
