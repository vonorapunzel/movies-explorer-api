const mongoose = require('mongoose');
const { isURL } = require('validator');
const { validationError } = require('../utils/errorConstant');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: (image) => isURL(image),
    message: validationError.validation.URL_MESSAGE,
  },
  trailer: {
    required: true,
    type: String,
    validate: (image) => isURL(image),
    message: validationError.validation.URL_MESSAGE,
  },
  thumbnail: {
    required: true,
    type: String,
    validate: (image) => isURL(image),
    message: validationError.validation.URL_MESSAGE,
  },
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
