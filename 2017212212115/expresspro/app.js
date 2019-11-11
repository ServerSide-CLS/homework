var createError = require('http-errors');
var express = require('express');
const hbs=require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var indexRouter = require('./routes/index');

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
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;