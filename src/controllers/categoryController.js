const categoryService = require('../services/categoryService');

const categoryController = {
  async add(req, res) {
    const data = await categoryService.validateAddBody(req.body);
    const category = await categoryService.add(data);
    res.status(201).json(category);
  },
};

module.exports = categoryController;