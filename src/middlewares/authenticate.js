const { readToken } = require('../services/helpers');
const loginService = require('../services/loginService');

const authenticate = async (req, _res, next) => {
  const email = readToken(req.headers.authorization);
  const foundUser = await loginService.checkUserByEmail({ email });
  req.user = foundUser;
  next();
};

module.exports = authenticate;