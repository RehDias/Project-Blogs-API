const Joi = require('joi');
const models = require('../database/models');
const { validateJoiSchema, notFoundError } = require('./helpers');

const loginService = {
  validateLoginBody: validateJoiSchema(Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(255),
  }).required().messages({
    'string.empty': 'Some required fields are missing',
  })),

  async checkUserByEmail({ email }) {
    const exist = await models.User.findOne({ where: { email } });
    if (!exist) notFoundError('Invalid fields');
  },
};

module.exports = loginService;