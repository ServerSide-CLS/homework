var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引用handlbars模块
var hbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




var app = express();

//模板引擎设置
// view engine setup
app.set('view engine', 'hbs');         //设置默认的模板引擎
app.set('views', path.join(__dirname, 'views/layouts'));    //设置模板文件存放位置

// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',   //版文件使用的后缀名
  defaultLayout: 'default',  //设置默认的页面布局模版为 default.hbs 文件
  layoutsDir:  __dirname + '/views/layouts/',  //设置布局模版文件的目录
  partialsDir: __dirname + '/views/partials/',  //设置分页模板文件目录
  helpers: require('./public/javascripts/pageSelect')  //自定义helpers对象
}))
//




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态资源文件目录
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {layout: false, status: 500});   //取消自动加载的默认布局模板
});

module.exports = app;
