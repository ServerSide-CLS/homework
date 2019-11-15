var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

var indexRouter = require('./routes/signup');
var homeRouter = require('./routes/home');

var app = express();

app.use(session({
  secret: 'cfdf906582445619',
  resave: false,           // 是否允许重新设置session
  saveUninitialized: true,  // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 1, // cookie有效时间
    httpOnly: true,         // 禁止客户端document.cookie查询
  },
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}));

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.get('/call', (req, res) => {
  res.send('usr')
})

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
