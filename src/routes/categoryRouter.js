const express = require('express');

const route = express.Router();

const category = require('../controllers/categoryController');
const validateJWT = require('../middlewares/validateJWT');

route.post('/', validateJWT, category.create);

route.get('/', validateJWT, category.getAll);

module.exports = route;
