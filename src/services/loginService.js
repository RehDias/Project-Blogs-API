const Joi = require('joi');
const models = require('../database/models');
const { validateJoiSchema, throwError } = require('./helpers');

const loginService = {
  validateLoginBody: validateJoiSchema(Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(255),
  }).required().messages({
    'string.empty': 'Some required fields are missing',
  })),

  async checkUserByEmail({ email }) {
    const user = await models.User.findOne({ where: { email }, raw: true });
    if (!user) throwError('ValidationError', 'Invalid fields');
    return user;
  },
};

module.exports = loginService;