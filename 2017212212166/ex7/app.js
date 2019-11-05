var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var hbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

//
var indexRouter = require('./routes/index');

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//注册helper
var handlebars = require("handlebars");

handlebars.registerHelper('css', function(str, option) {
  var cssList = this.cssList || [];
  if(cssList.indexOf(str)<0) {
    cssList.push(str);
  }
  this.cssList = cssList.concat();
});

handlebars.registerHelper('js', function(str, option) {
  var jsList = this.jsList || [];
  if(jsList.indexOf(str)<0) {
    jsList.push(str);
  }
  this.jsList = jsList.concat();
});


// 设置handlebars参数
app.engine( 'hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//
app.use('/', indexRouter);


// 定制 404 页面 (返回404状态码)
app.use(function(req, res) {
    let currentTime = new Date();
    res.type('text/plain');
    res.status(404);
    res.send('404 - 你访问的页面可能去了火星\n' + currentTime);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(3000);
// 监听服务端口, 保证程序不会退出
app.listen(app.get('port'), function() {
    console.log('Express 服务正在运行在 http://localhost:' + app.get('port') + '; 按 Ctrl-C 关闭服务.');
});


module.exports = app;