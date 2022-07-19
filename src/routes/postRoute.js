const { Router } = require('express');
const postController = require('../controllers/postController');
const authenticate = require('../middlewares/authenticate');

const postRoute = Router();

postRoute.delete('/:id', authenticate, postController.remove);
postRoute.put('/:id', authenticate, postController.edit);
postRoute.get('/search', authenticate, postController.search);
postRoute.get('/:id', authenticate, postController.getById);
postRoute.get('/', authenticate, postController.list);
postRoute.post('/', authenticate, postController.add);

module.exports = postRoute;