var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars')
var indexRouter = require('./routes/index');
var bodyparser=require("body-parser");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs',hbs({
  extname:"hbs",
  defaultLayout:"default",
  layoutsDir:__dirname+"/views/layouts",
  partialsDir:__dirname+"/views/partials"
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
app.listen(3000);
module.exports = app;