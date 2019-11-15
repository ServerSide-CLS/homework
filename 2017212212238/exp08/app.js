var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var hbs = require("express-handlebars");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
// var multer = require('multer');
var app = express();


//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
//设置视图模板引擎hbs
app.set('view engine', 'hbs');
app.engine('.hbs', hbs ({
  extname: '.hbs',
  defaultLayout: 'layouts',
  layoutsDir: __dirname + '/views/layouts'
}));

app.use(favicon());
//加载日志中间件。
app.use(logger('dev'));
app.use(bodyParser.json());
//加载解析urlencoded请求体的中间件。
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(multer); 
app.get('/', function(req, res){
   res.render('index');
});
//设置public文件夹为存放静态文件的目录。
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
//路由控制器
app.use('/', routes);
app.use('/users', users);
app.listen(2000, () => {
    console.log("server starts on http://localhost:2000");
});




module.exports = app;
