const user = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');
const { validateUpdateUser } = require('../middlewares/validation');

user.get('/me', getUser);
user.patch('/me', validateUpdateUser, updateUser);

module.exports = user;
