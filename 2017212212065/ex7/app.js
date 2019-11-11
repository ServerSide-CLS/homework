var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

var hbs = require('express-handlebars')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
var help = {
  equal: function(a,b,options){
    if(a == b){
      return options.fn(this);
    }else{
      return options.inverse(this);
    }
  },
};
app.engine('.hbs', hbs( {
  extname:'.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: help,
}));
app.get('/', (req, res) => {
  res.render('home', {layout: 'default', params: 'm-home'});
})
module.exports = app;