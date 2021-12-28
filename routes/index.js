const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, loginUser, logoutUser } = require('../controllers/user');
const { validateUser, validateLogin } = require('../middlewares/validation');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, loginUser);
router.post('/signout', auth, logoutUser);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

module.exports = router;
