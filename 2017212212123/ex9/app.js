var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var opt = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60000 }
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(session(opt));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.listen(3030)

module.exports = app;