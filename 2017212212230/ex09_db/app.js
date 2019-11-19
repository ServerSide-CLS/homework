var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cors = require('cors');

require('./models/db');

// var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');

var app = express();

var help = {
  if_eq: function (v1,v2,opts) {
    if(v1 == v2)
      return opts.fn(this);
    else
      return opts.inverse(this);
  },
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  helpers: help,
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.redirect('/signup');
})
app.use('/admin', adminRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);

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
