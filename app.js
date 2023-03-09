const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./app/api/v1/auth/router');
const categoriesRouter = require('./app/api/v1/categories/router');
const usersRouter = require('./app/api/v1/users/router');
const userRefreshTokenRouter = require('./app/api/v1/userRefreshToken/router');
const campaignsRouter = require('./app/api/v1/campaigns/router');
const downloadersRouter = require('./app/api/v1/downloaders/router');

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

const v1 = '/api/v1';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(`${v1}`, authRouter);
app.use(`${v1}`, categoriesRouter);
app.use(`${v1}`, usersRouter);
app.use(`${v1}`, userRefreshTokenRouter);
app.use(`${v1}`, campaignsRouter);
app.use(`${v1}`, downloadersRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
