const express = require('express');

const route = express.Router();

const user = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const validateJWT = require('../middlewares/validateJWT');

route.get('/', validateJWT, user.getAll);

route.post('/', validateUser, user.create);

route.get('/:id', validateJWT, user.getById);

route.delete('/me', validateJWT, user.exclude);

module.exports = route;
