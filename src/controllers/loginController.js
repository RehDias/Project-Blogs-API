const loginService = require('../services/loginService');

const loginController = {
  async login(req, res) {
    const data = await loginService.validateAddBody(req.body);
    await loginService.checkUserByEmail(data);
    const token = await loginService.createToken(data);
    res.json({ token });
  },
};

module.exports = loginController;