var createError = require('http-errors');
var express = require('express');
const hbs=require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

//自定义helper
var helper={
  showGoods:(entries,pageSize,pageNumber)=>{
      let str="";
      str+="<tr>";
      for(var i=pageSize*(pageNumber-1);i<pageSize*pageNumber;i++){
          
        str+="<td><p>"+entries[i].name+"</p><p>"+entries[i].nums+"<p></p>"+entries[i].price+"</p></td>";
        if(i==pageSize*(pageNumber-1)+3)
            str+="</tr><tr>";
        }
        str+="</tr>";
       return str;
  },
  print_pagination:(pageNo,pageCount,)=>{
    str=""
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
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'views'));
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
