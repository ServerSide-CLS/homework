var express = require('express');
var path = require('path');
var app = express();
// 引用handlebars模块
var index = require('./bin/index.js');
var hbs = require('express-handlebars');
// 设置模板引擎
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', index,function (req, res) {
  res.render('index', { layout: 'default', ...req.pageData });
});
// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.listen(3000, () => console.log(`listen on 3000!`));