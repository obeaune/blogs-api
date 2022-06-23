const express = require('express');

const route = express.Router();

const category = require('../controllers/categoryController');
const validateJWT = require('../middlewares/validateJWT');

route.post('/', validateJWT, category);

module.exports = route;
