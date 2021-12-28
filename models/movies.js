const mongoose = require('mongoose');
const { isURL } = require('validator');

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
    message: 'Указан не валидный URL',
  },
  trailer: {
    required: true,
    type: String,
    validate: (image) => isURL(image),
    message: 'Указан не валидный URL',
  },
  thumbnail: {
    required: true,
    type: String,
    validate: (image) => isURL(image),
    message: 'Указан не валидный URL',
  },
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
  },
  movieId: {
    required: true,
    type: String,
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
