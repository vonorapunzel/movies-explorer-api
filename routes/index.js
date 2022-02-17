const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, loginUser, logoutUser } = require('../controllers/user');
const { validateUser, validateLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const { requestError } = require('../utils/errorConstant');


router.all('/', auth);
router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, loginUser);
router.post('/signout', auth, logoutUser);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

// ресурс не найден
router.use('*', () => {
  throw new NotFoundError({ message: requestError.notFoundError.PAGE_MESSAGE });
});
module.exports = router;
