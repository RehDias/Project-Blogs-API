const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'jwtSecret';

const validateJoiSchema = (schema) => async (data) => {
  const result = await schema.validateAsync(data);
  return result;
};

const notFoundError = (message) => {
  const e = new Error(message);
  e.name = 'NotFoundError';
  throw e;
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
  notFoundError,
  createToken,
  readToken,
 };