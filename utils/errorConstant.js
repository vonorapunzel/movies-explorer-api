exports.requestError = {
  notFoundError: {
    USER_MESSAGE: 'Пользователь не найден',
    MOVIE_MESSAGE: 'Фильм не найден.',
    PAGE_MESSAGE: 'Такой страницы нет.',
  },
  badRequestError: {
    DATA_MESSAGE: 'Указаны некорректные данные.',
  },
  conflictError: {
    EMAIL_MESSAGE: 'пользователь с таким email уже зарегестрирован.',
  },
  forbiddenError: {
    MOVIE_MESSAGE: 'Действие запрещено.',
  },
};

exports.validationERROR = {
  validation: {
    URL_MESSAGE: 'Ошибка валидации URL.',
  },
};

exports.authError = {
  unauthorized: {
    LOGIN_MESSAGE: 'Неправильные e-mail или пароль',
    NOTOKEN_MESSAGE: 'Необходима авторизация',
  },
};

exports.limiterError = {
  requestError: {
    IP_MESSAGE: 'Слишком много запросов с вашего IP, попробуйте повторить попытку позже.',
  },
};
