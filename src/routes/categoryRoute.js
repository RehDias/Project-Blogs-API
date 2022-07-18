const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const authenticate = require('../middlewares/authenticate');

const categoryRoute = Router();

categoryRoute.get('/', authenticate, categoryController.list);
categoryRoute.post('/', authenticate, categoryController.add);

module.exports = categoryRoute;