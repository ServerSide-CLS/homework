var express = require('express');
const hbs=require('express-handlebars');
var path = require('path');
var inRouter = require('./routes/index');
var app = express();
var helper={
  show1:(entries,pageSize,pageNo)=>{
      let str="<tr>";
      var l=pageSize*(pageNo-1);
      var r=pageSize*pageNo;
      for(var i=l;i<r;i++){
        str+="<td><p>"+entries[i].name+"<p></td>";
        if(i==(pageNo-1)*pageSize+3)
            str+="</tr><tr>";
        }
        str+="</tr>";
      return str;
  },
  show2:(pageNo)=>{
    str=(pageNo==1?" <li><a>«</a></li>":" <li><a href='index?page=1'>«</a></li>");
    for(var i=1;i<=5;i++){
      str+=(i==pageNo?'<li><a href="index?page='+i+'"class="active">'+i+'</a></li>':'<li><a href="index?page='+i+'" >'+i+'</a></li>');
    }
    str+=(pageNo==5?" <li><a>»</a></li>":" <li><a href='index?page=7'>»</a></li>");
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
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/', inRouter);
module.exports = app;
app.listen(3000);