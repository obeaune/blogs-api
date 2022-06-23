const express = require('express');

const app = express();

const ErrorHandler = require('./middlewares/errorHandler');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');

app.use(express.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use(ErrorHandler);

module.exports = app;
