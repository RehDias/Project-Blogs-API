const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'jwtSecret';

const validateJoiSchema = (schema) => async (data) => {
  const result = await schema.validateAsync(data);
  return result;
};

const throwError = (errName, message) => {
  const err = new Error(message);
  err.name = errName;
  throw err;
};

const createToken = async ({ email }) => {
  const token = jwt.sign(email, secret);
  return token;
};

const readToken = async (token) => {
  const { data } = jwt.verify(secret, token);
  return data;
};

module.exports = {
  validateJoiSchema,
  throwError,
  createToken,
  readToken,
};