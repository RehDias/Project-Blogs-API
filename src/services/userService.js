const Joi = require('joi');
const models = require('../database/models');
const { validateJoiSchema } = require('./helpers');

const userService = {
  validateAddBody: validateJoiSchema(Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(255).min(6),
    image: Joi.string().max(255),
  })),

  async checkExistsByEmail(email) {
    const exist = await models.User.findOne({ where: { email } });
    return !!exist;
  },

  async add(data) {
    await models.User.create(data);
    // const addUser = await models.User.create(data);
    // const newUser = addUser.toJSON();
    // const { password, ...user } = newUser;
    // return user;
  },

  async list() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
      raw: true,
    });
    return users;
  },
};

module.exports = userService;