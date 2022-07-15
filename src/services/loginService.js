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

  // async validateToken(value) {
  //   const schema = Joi.string().required();
  //   try {
  //     const result = await schema.validateAsync(value);
  //     const [, token] = result.split(' ');
  //     return token;
  //   } catch (error) {
  //     throwError('Unauthorized', 'Expired or invalid token');
  //   }
  // },

  async checkUserByEmail({ email }) {
    const user = await models.User.findOne({ where: { email } });
    if (!user) throwError('ValidationError', 'Invalid fields');
    return user;
  },
};

module.exports = loginService;