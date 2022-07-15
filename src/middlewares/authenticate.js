const { readToken } = require('../services/helpers');

const authenticate = async (req, _res, next) => {
  readToken(req.headers.authorization);
  next();
};

module.exports = authenticate;