
const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'http://freemovies.nomoredomains.rocks',
  'https://freemovies.nomoredomains.rocks',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.set('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
