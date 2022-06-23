const express = require('express');

const route = express.Router();

const user = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const validateJWT = require('../middlewares/validateJWT');

route.post('/', validateUser, user.create);

route.get('/', validateJWT, user.getAll);

route.get('/:id', validateJWT, user.getById);

module.exports = route;
