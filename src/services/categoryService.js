const Joi = require('joi');
const models = require('../database/models');
const { validateJoiSchema } = require('./helpers');

const categoryService = {
  validateAddBody: validateJoiSchema(Joi.object({
    name: Joi.string().required().max(255),
  })),

  async add(data) {
    const category = await models.Category.create(data, { raw: true });
    return category;
  },

  async list() {
    const categories = await models.Category.findAll({ raw: true });
    return categories;
  },
};

module.exports = categoryService;