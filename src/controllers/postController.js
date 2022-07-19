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

  async getById(req, res) {
    const { id } = await postService.validateParamsId(req.params);
    await postService.checkPostExist(id);
    const post = await postService.getById(id);
    res.status(200).json(post);
  },

  async edit(req, res) {
    const [body, { id }] = await Promise.all([
      postService.validateEditBody(req.body),
      postService.validateParamsId(req.params),
    ]);
    await postService.checkUserPost(req.user.id, id);
    const data = await postService.edit(body, id);
    const post = await postService.getById(...data);
    res.status(200).json(post);
  },

  async remove(req, res) {
    const { id } = await postService.validateParamsId(req.params);
    await postService.checkPostExist(id);
    await postService.checkUserPost(req.user.id, id);
    await postService.remove(id);

    res.sendStatus(204);
  },
};

module.exports = postController;