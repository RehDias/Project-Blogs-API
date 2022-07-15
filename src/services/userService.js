const Joi = require('joi');
const models = require('../database/models');
const { validateJoiSchema, throwError } = require('./helpers');

const userService = {
  validateAddBody: validateJoiSchema(Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(255).min(6),
    image: Joi.string().max(255),
  })),

  validateParamId: validateJoiSchema(Joi.object({
    id: Joi.number().integer().positive().required(),
  })),

  async checkExistsByEmail(email) {
    const exist = await models.User.findOne({ where: { email } });
    return !!exist;
  },

  async add(data) {
    await models.User.create(data);
  },

  async list() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
      raw: true,
    });
    return users;
  },

  async getById(id) {
    const user = await models.User.findByPk(id, {
      attributes: { exclude: ['password'] },
      raw: true,
    });
    if (!user) throwError('NotFoundError', 'User does not exist');
    return user;
  },
};

module.exports = userService;