// 引用handlebars模块
var hbs = require('express-handlebars');
var express = require('express');
var app = express();
var path = require('path');
// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.get('/', (req, res) => {
  res.render('home');
})
app.listen(9100);
