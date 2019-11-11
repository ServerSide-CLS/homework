var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

//引用handlebars模块
var hbs = require('express-handlebars');
var app = express();


//helper函数 分页
var helper={
  showProducts:(entries,pageSize,pageNumber)=>{
      var str="";
      str+="<tr>";
      for(var i=pageSize*(pageNumber-1);i<pageSize*pageNumber;i++){
        str+="<td><p>"+entries[i].name+"</p></td>";
        if(i==pageSize*(pageNumber-1)+3)
            str+="</tr><tr>";
        }
        str+="</tr>";
        return str;
  },
  showPagination:(pageNo,pageCount)=>{
		var str=""
		//1/7时,上一页/下一页不能点击
    if(pageNo==1)
        str+=" <li><a href='goodslist?pageNumber=#' class='noUse'>&laquo;</a></li>";
    else
				str+=" <li><a href='goodslist?pageNumber="+(pageNo-1)+"'>&laquo;</a></li>";
				
    for(var i=1;i<=pageCount;i++){
      if(i==pageNo)
      str+='<li><a href="goodslist?pageNumber='+i+'" class="active">'+i+'</a></li>';
      else
      str+='<li><a href="goodslist?pageNumber='+i+'" >'+i+'</a></li>';
    }
    if(pageNo==7)
        str+=" <li><a href='goodslist?pageNumber=#' class='noUse'>&raquo;</a></li>";
    else{
      pageNo=parseInt(pageNo)+1;
        str+=" <li><a href='goodslist?pageNumber="+pageNo+"'>&raquo;</a></li>";
    }
    return str;
  }
}

// view engine setup
//设置模板引擎
app.set('view engine','hbs');

//设置静态资源目录
app.set('views', path.join(__dirname, 'views'));

//设置handlebars参数
app.engine('.hbs',hbs({
  extname:'.hbs',
  defaultLayout:'default',
  layoutsDir:__dirname+'/views/layouts/',
  partialsDir:__dirname+'/views/partials/',
  helpers:helper
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
