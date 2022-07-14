const loginService = require('../services/loginService');
const userService = require('../services/userService');
const { throwError, readToken } = require('../services/helpers');

const authenticate = async (req, _res, next) => {
  const token = await loginService.validateToken(req.header.authorization);
  const data = await readToken(token);
  const exists = await userService.checkExistsByEmail(data);
  if (!exists) throwError('Unauthorized', 'Token not found');
  next();
};

module.exports = authenticate;