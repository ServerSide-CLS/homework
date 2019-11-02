var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars')
// var fs = require('fs');

var indexRouter = require('./routes/index');

var app = express();

// 创建一个可以写入的流，写入到文件 access.log 中
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.txt'), { flags: 'a' })

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs ({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}));

app.use(logger('dev'));
// app.use(logger('dev', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
