const movie = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateMovie, validateDeleteMovie } = require('../middlewares/validation');

movie.get('/', getMovies);
movie.post('/', createMovie);
movie.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = movie;
