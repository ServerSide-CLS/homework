var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var indexRouter = require('./routes/index');

var app = express();

// 设置模板引擎
app.set('view engine', 'hbs');
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'));
// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));


// 解析 application/json
app.use(bodyParser.json());

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true }));

// 解析 multipart/form-data
app.use(multer());
app.use(express.static('public'));

app.use(logger('dev'));//打印到控制台
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.get('/register', function(req, res) {
  res.render('index', {});
});