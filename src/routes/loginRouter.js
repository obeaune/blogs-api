const express = require('express');

const route = express.Router();

const login = require('../controllers/loginController');

route.post('/', login);

module.exports = route;
