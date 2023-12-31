var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tripsRouter = require('./routes/trips')

const backendURL = 'https://tickethack-back-end.vercel.app/'
const frontendURL = 'https://tickethack-front-end.vercel.app/'

var app = express();
const cors = require('cors');
app.use(cors());


require('./models/connection');
const Trip = require('./models/trips');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);

module.exports = app;
