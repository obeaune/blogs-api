const express = require('express');

const route = express.Router();

const post = require('../controllers/postController');
const validateJWT = require('../middlewares/validateJWT');

route.get('/', validateJWT, post.getAll);

route.get('/:id', validateJWT, post.getById);

route.post('/', validateJWT, post.create);

route.put('/:id', validateJWT, post.update);

module.exports = route;
