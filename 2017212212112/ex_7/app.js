var express = require('express')
var path = require('path')
var hbs = require('express-handlebars')
var indexRouter = require('./routes')

var app = express()

var help = {
  if_eq: function(a, b,opts) {
    if(a == b)
      return opts.fn(this);
    else
      return opts.inverse(this);
  }
}

//引用hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: help
}));

app.use(express.static(path.join(__dirname, "/public")));

app.use('/', indexRouter);

app.listen(8100);