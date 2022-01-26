const user = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');
const { validateUpdateUser } = require('../middlewares/validation');

user.get('/users/me', getUser);
user.patch('/users/me', validateUpdateUser, updateUser);

module.exports = user;
