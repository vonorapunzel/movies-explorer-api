require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorHandler = require('./middlewares/globalErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');

const { MONGODB_URI, PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI);
app.use(requestLogger);
app.use(limiter);
app.use(routes);

app.use(errorLogger);

// обработчик ошибок валидации
app.use(errors());

// глобальный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
