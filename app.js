require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorHandler = require('./middlewares/globalErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');

const {
  MONGODB_URI,
  DEV_URI = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV,
  PORT = 3000,
} = process.env;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
mongoose.connect(NODE_ENV === 'production' ? MONGODB_URI : DEV_URI);
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
