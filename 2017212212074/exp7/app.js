var express = require('express');
var path = require('path');
// 引用中间件
var getPageData = require('./src/js/getPageData');
// 引用handlebars模块
var hbs = require('express-handlebars')
var app = express();

// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '/src')));
// 设置handlebars参数
app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
//使用获取产品数据的中间件获取产品数据
app.get('/', getPageData,function (req, res) {
  res.render('home', { layout: 'default', ...req.pageData });
});

app.use('*', function (req, res) {
  res.render('error', { layout: false});
})
app.listen(3000, () => console.log(`listen on 3000! go to http://localhost:3000`));