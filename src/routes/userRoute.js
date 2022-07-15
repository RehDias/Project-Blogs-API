const { Router } = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const userRoute = Router();

userRoute.get('/', authenticate, userController.list);
userRoute.post('/', userController.add);

module.exports = userRoute;