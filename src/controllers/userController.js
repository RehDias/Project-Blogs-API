const userService = require('../services/userService');
const { createToken } = require('../services/helpers');

const userController = {
  async add(req, res) {
    const data = await userService.validateAddBody(req.body);
    const userExist = await userService.checkExistsByEmail(data.email);
    if (userExist) return res.status(409).json({ message: 'User already registered' });
    await userService.add(data);
    const token = await createToken(data);
    res.status(201).json({ token });
  },

  async list(_req, res) {
    const users = await userService.list();
    res.status(200).json(users);
  },

  async getById(req, res) {
    const { id } = await userService.validateParamId(req.params);
    const user = await userService.getById(id);
    res.status(200).json(user);
  },
};

module.exports = userController;