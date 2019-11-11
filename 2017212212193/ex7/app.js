var express = require('express');
var hbs = require('express-handlebars')
var app = express();
var path = require('path');

var indexRouter = require('./routes/index');

app.use('/', indexRouter);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');//设置模板引擎
app.engine('.hbs', hbs ({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  }));

app.listen(3000)
module.exports = app;