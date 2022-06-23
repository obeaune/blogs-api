const express = require('express');

const app = express();

// const ErrorHandler = require('./middlewares/errorHandler');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

app.use(express.json());

app.use('/users', userController);
app.use('/login', loginController);

// app.use(ErrorHandler);

module.exports = app;
