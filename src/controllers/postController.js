const Sequelize = require('sequelize');
const config = require('../database/config/config');
const postService = require('../services/postService');

const sequelize = new Sequelize(config.development);

const postController = {
  async add(req, res) {
    const data = await postService.validateBodyAdd(req.body);
    await postService.categoryExists(data.categoryIds);

    await sequelize.transaction(async (t) => {
      const objPost = { ...data, userId: req.user.id };
      console.log(objPost);
      const createPost = await postService.addPost(objPost, { transaction: t });
      await postService.addCategory(createPost.id, data, { transaction: t });
      const post = await postService.getPost(createPost.id);
      res.status(201).json(post);
    });
  },

  async list(_req, res) {
    const posts = await postService.list();
    res.status(200).json(posts);
  },
};

module.exports = postController;