const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const { validateJoiSchema, notFoundError } = require('./helpers');

const secret = process.env.JWT_SECRET || 'jwtSecret';

const loginService = {
  validateAddBody: validateJoiSchema(Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(255),
  }).required().messages({
    'string.empty': 'Some required fields are missing',
  })),

  async createToken({ email }) {
    const token = jwt.sign(email, secret);
    return token;
  },

  async readToken(token) {
    const { data } = jwt.verify(secret, token);
    return data;
  },

  async checkUserByEmail({ email }) {
    const exist = await models.User.findOne({ where: { email } });
    if (!exist) notFoundError('Invalid fields');
  },
};

module.exports = loginService;