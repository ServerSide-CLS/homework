const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

const hbs=require('express-handlebars');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var sz=8,cnt=7,sum=56;//capacity,the number of pasges,total goods

app.set('view engine','hbs');

var helper=
{
  goodsList:(sz,nowPage)=>{
      ed=nowPage*sz;
      st=ed-sz+1;
      tmp="<tr>";
      for(var i=st;i<=ed;i++)
      {
          id=i%sz==0?8:i%sz;
          tmp+="<td><p>我是图"+nowPage+"-"+id+"</p></td>";
          if(i%sz==sz/2)
          {
            tmp+="</tr><tr>";
          }
      }
      tmp+="</tr>";
      return tmp;
  },
  showPages:(nowPage)=>{
    if(nowPage==1)
        tmp="<li><a>«</a></li>";
    else
        tmp="<li><a href='index?page=1'>«</a></li>"
    for(var i=1;i<=cnt;i++)
    {
        if(i==nowPage)
            tmp+='<li><a href="index?page='+i+'"class="active">'+i+"</a></li>";
        else
            tmp+='<li><a href="index?page='+i+'" >'+i+"</a></li>";
    }
    if(nowPage==7)
        tmp+="<li><a>»</a></li>";
    else
        tmp+="<li><a href='index?page=7'>»</a></li>";
    return tmp;
  }
}

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',hbs({
  extname:'.hbs',
  defaultLayout:'default',
  layoutsDir:__dirname+'/views/layouts/',
  partialsDir:__dirname+'/views/partials/',
  helpers:helper
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
  res.render('partials/content', {
    sz:sz,    
    cnt:cnt,  
    sum:sum,          
    page:(req.query.page||1),   
    css:['/static/header.css','/static/content.css','/static/footer.css'],
 });
})

app.get('/index',(req,res)=>{
  res.render('partials/content', { 
    sz:sz,
    cnt:cnt,  
    sum:sum,          
    page:(req.query.page||1), 
    css:['/static/header.css','/static/content.css','/static/footer.css'],
 });
});

app.listen(app.get('port'), function() {
  console.log('Express 服务正在运行在 http://localhost:' + app.get('port') + '; 按 Ctrl-C 关闭服务.');
});
