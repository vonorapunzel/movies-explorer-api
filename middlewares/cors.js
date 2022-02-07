const cors = require('cors');
const ForbiddenError = require('../errors/ForbiddenError');

const whitelist = ['http://localhost:3000', 'http://freemovies.nomoredomains.rocks', 'https://freemovies.nomoredomains.rocks'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new ForbiddenError('Доступ к ресурсу запрещён'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = cors(corsOptions);
