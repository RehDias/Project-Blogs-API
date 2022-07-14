const { Router } = require('express');
const userController = require('../controllers/userController');

const userRoute = Router();

userRoute.get('/', userController.list);
userRoute.post('/', userController.add);

module.exports = userRoute;