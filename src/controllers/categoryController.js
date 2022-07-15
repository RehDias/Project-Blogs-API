const categoryService = require('../services/categoryService');

const categoryController = {
  async add(req, res) {
    const data = await categoryService.validateAddBody(req.body);
    const category = await categoryService.add(data);
    res.status(201).json(category);
  },

  async list(_req, res) {
    const categories = await categoryService.list();
    res.status(200).json(categories);
  },
};

module.exports = categoryController;