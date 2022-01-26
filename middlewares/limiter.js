const rateLimiter = require('express-rate-limit');
const { limiterError } = require('../utils/errorConstant');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: limiterError.requestError.IP_MESSAGE,
});

module.exports = limiter;
