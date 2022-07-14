const userService = require('../services/userService');
const { createToken } = require('../services/helpers');

const userController = {
  async add(req, res) {
    const data = await userService.validateAddBody(req.body);
    const userExist = await userService.checkExistsByEmail(data);
    if (userExist) return res.status(409).json({ message: 'User already registered' });
    await userService.add(data);
    const token = await createToken(data);
    res.status(201).json({ token });
  },
};

module.exports = userController;