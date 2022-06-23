const express = require('express');

const route = express.Router();

const user = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

route.get('/', user.getAll);

route.post('/', validateUser, user.create);

module.exports = route;
