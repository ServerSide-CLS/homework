var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var hbs = require('express-handlebars')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials/',

}));

module.exports = app;
app.listen(3000, () => console.log('listening on port 3000'));

