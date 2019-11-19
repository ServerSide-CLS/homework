var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var hbs = require('express-handlebars')
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

var help = {
    if_eq: function (v1,v2,opts) {
      if(v1 == v2)
        return opts.fn(this);
      else
        return opts.inverse(this);
    },
};

app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers:help,
}));

// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

// 解析 multipart/form-data
app.use(multer()); 
app.use(express.static('public'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
