var createError = require('http-errors');
var path = require('path');
var express = require('express');
var app = express();

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// 引用handlebars模块
var hbs = require('express-handlebars')

// 设置模板引擎
app.set('view engine', 'hbs');
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'));


// 设置handlebars参数
app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(multer())

//解析Cookie头，并用由cookie名称作为键的对象填充req.cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//静态文件

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//定制 404 页面 (返回404状态码)
app.use(function(req, res, next) {
    let currentTime = new Date();
    res.type('text/plain');
    res.status(404);
    res.send('404 - 你访问的页面可能去了火星\n' + currentTime);
});

//定制 500 页面 (返回500状态码)
app.use(function(err, req, res, next) {
    let currentTime = new Date();
    let errInfo = err.stack;
    res.type('text/plain');
    res.status(500);
    res.send('500 - 服务器发生错误\n' + 'errInfo:' + errInfo + '\n' + 'currentTime:' + currentTime);
});

// 监听服务端口, 保证程序不会退出
app.listen(app.get('port'), function() {
    console.log('Express 服务正在运行在 http://localhost:' + app.get('port') + '; 按 Ctrl-C 关闭服务.');
});

module.exports = app;