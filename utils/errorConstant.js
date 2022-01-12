exports.requestError = {
  notFoundError: {
    USER_MESSAGE: 'Пользователь не найден',
    MOVIE_MESSAGE: 'Фильмы не найден.',
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
  serverError: {
    ERROR: 'На сервере произошла ошибка.',
  }
};

exports.validationError = {
  validation: {
    URL_MESSAGE: 'Ошибка валидации URL.',
    EMAIL_MESSAGE: 'Указана неверный email.',
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
