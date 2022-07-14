const loginService = require('../services/loginService');
const { createToken } = require('../services/helpers');

const loginController = {
  async login(req, res) {
    const data = await loginService.validateLoginBody(req.body);
    await loginService.checkUserByEmail(data);
    const token = await createToken(data);
    res.json({ token });
  },
};

module.exports = loginController;