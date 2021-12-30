require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const { dbUri } = require('./utils/constants');
const { requestError } = require('./utils/errorConstant');
const NotFoundError = require('./errors/NotFoundError');

const { NODE_ENV, MONGODB_URI, PORT } = process.env;

const app = express();
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? MONGODB_URI : dbUri);
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

// обработчик ошибок валидации
app.use(errors());

// ресурс не найден
app.use(() => {
  throw new NotFoundError({ message: requestError.notFoundError.PAGE_MESSAGE });
});

// глобальный обработчик ошибок
app.use((err, req, res, next) => {
  if (!err.status) {
    const { statusCode = 500, message } = err;

    res.status(statusCode).send({ message: statusCode === 500 ? { message: 'На сервере произошла ошибка' } : message });
  } else {
    res.status(err.status).send(err.message);
    return;
  }

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
