require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const passport = require('./config/passport');
const app = express();

//config lib middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(
  session({
    secret: process.env.SECERT_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

//init database
require('./db/db.mongo');

app.use(passport.initialize());
app.use(passport.session());

//init route
app.use('/', require('./routes/index'));

//handle error
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res
    .status(statusCode)
    .json({ message: error.message || 'Interval Server Error' });
});

module.exports = app;
