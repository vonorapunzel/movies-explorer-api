const { requestError } = require('../utils/errorConstant');

const errorHandler = (err, req, res, next) => {
  if (!err.status) {
    const { statusCode = 500, message } = err;

    res.status(statusCode).send(
      statusCode === 500 ? { message: requestError.serverError.ERROR } : message,
    );
  } else {
    res.status(err.status).send(err.message);
    return;
  }

  next();
};

module.exports = errorHandler;
