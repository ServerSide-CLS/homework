// 引入http-errors包(能根据传入的http状态码，生成对应的HTTP error)
var createError = require('http-errors');
// 引入express模块
var express = require('express');
const hbs=require('express-handlebars');
var path = require('path');
// 提供日志的中间件
var logger = require('morgan');

var indexRouter = require('./routes/index');

// 使用express() 方法 创建一个 app 应用
var app = express();

var helper={
  showProductList:(entries,pageSize,pageNo)=>{
      let str="<tr>";
      var l=pageSize*(pageNo-1);
      var r=pageSize*pageNo;
      for(var i=l;i<r;i++){
        str+="<td><p>"+entries[i].name+"</p><p>"+entries[i].productData+"<p></td>";
        if(i==(pageNo-1)*pageSize+3)
            str+="</tr><tr>";
        }
        str+="</tr>";
      return str;
  },
  showPages:(pageNo)=>{
    str=(pageNo==1?" <li><a>«</a></li>":" <li><a href='index?page=1'>«</a></li>");
    for(var i=1;i<=7;i++){
      str+=(i==pageNo?'<li><a href="index?page='+i+'"class="active">'+i+'</a></li>':'<li><a href="index?page='+i+'" >'+i+'</a></li>');
    }
    str+=(pageNo==7?" <li><a>»</a></li>":" <li><a href='index?page=7'>»</a></li>");
    return str;
  }
}

app.set('view engine','hbs');

// 配置页面文件(例如 .ejs 文件)的根目录
app.set('views', path.join(__dirname, 'views'));

// 注册模板引擎处理后缀名为 hbs 的文件
app.engine('.hbs',hbs({
  extname:'.hbs',
  defaultLayout:'default',
  // 设置布局模版文件的目录为 views/layouts/ 文件夹
  layoutsDir:__dirname+'/views/layouts/',
  partialsDir:__dirname+'/views/partials/',
  helpers:helper
}));

// 将 请求信息 打印在控制台
app.use(logger('dev'));

// 为了支持 req.body 的使用
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//将静态文件目录设置为：项目根目录+/public
app.use('/static',express.static(path.join(__dirname, 'public')));

//引入indexRouter路由
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 生成http 404状态码的error,配合express错误处理中间件函数
  // Express 会将当前请求视为处于错误状态，并跳过所有剩余的非错误处理路由和中间件函数，最后被内置的错误处理程序处理
  next(createError(404));
});

// 错误处理程序 error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
