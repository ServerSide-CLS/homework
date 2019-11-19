
//启动文件，或者说入口文件
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var mongoose = require('mongoose'); //引入对象
var TodoModel = mongoose.model('user');//引入模型
var URL = require('url'); //引入URL中间件，获取req中的参数需要
// 引用handlebars模块
var hbs = require('express-handlebars')
//引入Cookie
var cookieParser = require('cookie-parser');
// app.use(cookieParser());
//引入session
var session = require('express-session');
//生成一个express实例 app
var app = express();

//设置端口
app.set('port', process.env.PORT || 3000);

// //设置views文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录
// app.set('views', path.join(__dirname, 'views'));
// //设置视图模板引擎为 ejs
// app.set('view engine', 'ejs');

// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))
// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}));

// 解析 application/json
app.use(bodyParser.json()); 
// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

// 解析 multipart/form-data
// app.use(multer()); 
app.use(express.static('public'));


//加载日志中间件
app.use(logger('dev'));
// //加载解析json的中间件
// app.use(express.json());
// //加载解析urlencoded请求体的中间件
// app.use(express.urlencoded({ extended: false }));
//加载解析cookie的中间件
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录
// css显示不了，注释掉以下两行，出现because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'))
routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});