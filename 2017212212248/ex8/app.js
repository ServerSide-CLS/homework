var createError = require('http-errors');
var express = require('express');
var session = require('express-session');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引用handlebars模块
var hbs = require('express-handlebars')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    cookie:{
        maximumAge: 1000 * 60 * 3,
    }
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.engine('.hbs',hbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir:  __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
}))

app.get('/',(req,res) => {
  res.render('index',{
    layout:'layout',
  })
})

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

app.listen(8000);
//监听8000端口

module.exports = app;
