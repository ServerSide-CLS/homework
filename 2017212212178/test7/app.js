// 引用handlebars模块
var express = require('express');
var hbs = require('express-handlebars');
var app = express();
var path = require('path');
var things = require('./routes/index');

//模块引用
app.use('/',things);

// 设置模板引擎
app.set('view engine', 'hbs');

// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// 错误处理路由
app.get('*', function(req, res){
  res.send('404. Sorry, this is an invalid URL.');
});

//端口监听
app.listen(5000, () => console.log('listening on port 5000'));

