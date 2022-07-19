const Joi = require('joi');
const models = require('../database/models');
const { validateJoiSchema, throwError } = require('./helpers');

const postService = {
  validateBodyAdd: validateJoiSchema(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().required()),
  }).messages({
    'string.empty': 'Some required fields are missing',
  })),

  async categoryExists(categoryIds) {
    const exist = await models.Category
      .findOne({ where: { id: categoryIds[0] } });
    if (!exist) throwError('ValidationError', '"categoryIds" not found');
  },

  async addPost(data) {
    const { categoryIds, ...post } = data;
    const create = await models.BlogPost.create(post);
    const result = create.toJSON();
    return result;
  },

  async addCategory(postId, data) {
    const catPost = data.categoryIds.map((categoryId) => ({ postId, categoryId }));
    await models.PostCategory.bulkCreate(catPost);
  },

  async getPost(id) {
    const post = await models.BlogPost.findByPk(id, { raw: true });
    return post;
  },

  async list() {
    const list = await models.BlogPost.findAll({
      include: [{
        model: models.User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: models.Category,
        as: 'categories',
        through: { attributes: [] },
      }],
    });
    return list;
  },
};

module.exports = postService;