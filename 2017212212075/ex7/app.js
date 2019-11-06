var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var getProducts = require('./public/javascripts/products');
var app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.get('/goodlist', getProducts,function (req, res) {
  res.render('index', { layout: 'default', ...req.pageData });
});

app.listen(3000);
