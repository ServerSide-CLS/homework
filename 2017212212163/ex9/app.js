var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session  = require('express-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var multer = require('multer');
// 引用handlbars模块
var hbs = require('express-handlebars');


var indexRouter = require('./routes/index');


var app = express();



//模板引擎设置
// view engine setup
app.set('view engine', 'hbs');         //设置默认的模板引擎
app.set('views', path.join(__dirname, 'views/layouts'));    //设置模板文件存放位置

// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',   //模板文件使用的后缀名
  defaultLayout: 'default',  //设置默认的页面布局模版为 default.hbs 文件
  layoutsDir:  __dirname + '/views/layouts/',  //设置布局模版文件的目录
  partialsDir: __dirname + '/views/partials/',  //设置分页模板文件目录
  //helpers: require('./public/javascripts/pageSelect')  //自定义helpers对象
}))
//

// 解析 application/json，无挂载路径,任何路径都会加载中间件
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

// 解析 multipart/form-data
//app.use(multer); 


//session模块配置信息
var opt = {
  secret: 'keyboard',
  cookie: { maxAge: 60 * 1000 * 30},  //过期时间
  resave: true,
  saveUninitialized: true,
}
app.use(session(opt)); //加载session模块


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态资源文件目录
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.use('/login', require('./routes/login'));

app.get('/index',function(req, res){
  res.render('index',{layout: false});
})

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
