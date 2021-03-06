var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//注册helper
var handlebars = require("handlebars");

handlebars.registerHelper('css', function(str, option) {
  var cssList = this.cssList || [];
  if(cssList.indexOf(str)<0) {
    cssList.push(str);
  }
  this.cssList = cssList.concat();
});

handlebars.registerHelper('js', function(str, option) {
  var jsList = this.jsList || [];
  if(jsList.indexOf(str)<0) {
    jsList.push(str);
  }
  this.jsList = jsList.concat();
});


// 设置handlebars参数
app.engine( 'hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//app.use(express.static('public'))

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

//app.use(cookieParser());

app.listen(8000)
//console.log(__dirname);
module.exports = app;
