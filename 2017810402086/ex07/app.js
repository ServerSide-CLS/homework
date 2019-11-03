var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var handlebars = require('handlebars');

var indexRouter = require('./routes/index');

var app = express();

var help = {
  checkPage: (now, want, options) => {
    if(now == want) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
  getPrv: (now) => {
    return now - 1;
  },
  getNext: (now) => {
    return +1 + +now;
  },
  createPagination: (now, total, options) => {
    let htmlString = '';
    for(var i = 1; i <= total; i++){
      if(i == now){
        htmlString += `
        <li class="page-item active" aria-current="page">
        <span class="page-link">
        ${i}
        <span class="sr-only">(current)</span>
        </span>
        </li>
        `;
      }
      else{
        htmlString += `
        <li class="page-item">
        <a class="page-link" href="${i}">${i}</a>
        </li>
        `;
      }
    }
    return new handlebars.SafeString(htmlString);
  }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: help,
}));

app.use(logger('dev'));
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
