var hbs=require('express-handlebars')
var express = require('express');
var path = require('path');
var PageTransROuter = require('./routes/index');
var app = express();

// views layouts
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', hbs ({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}));

//jing tai wen jian
app.use('/',express.static(path.join(__dirname, 'public')));
//shi xian fen ye
app.use('/', PageTransROuter);
app.listen(8000,() => console.log('listening on port 8000'))
module.exports = app;
