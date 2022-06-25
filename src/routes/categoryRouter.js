const express = require('express');

const route = express.Router();

const category = require('../controllers/categoryController');
const validateJWT = require('../middlewares/validateJWT');

route.get('/', validateJWT, category.getAll);

route.post('/', validateJWT, category.create);

module.exports = route;
