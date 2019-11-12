var express = require('express');
var app = express();
var path= require('path');
var hbs = require('express-handlebars')
var data = require('./_data');
var _ = require('lodash')
var con={
  totalnum:50,
  nowpagesize:8,
  nowpagenum:0,
}
// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'public')));
// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.get('/', (req, res) =>{
  con.totalnum=data.subjects.length;
  con.nowpagesize=7;
  con.nowpagenum=1;
  var chunk = _.chunk(data.subjects, con.nowpagesize)
  var pagedata={
    nowPage:con.nowpagenum,
    pageNum:(con.totalnum+con.nowpagesize-1)/con.nowpagesize
  };
  console.log(Paging(pagedata));
  res.render('home', {layout: 'default',movies:chunk[con.nowpagenum-1],paging:Paging(pagedata),totnum:pagedata.pageNum,nowpage:pagedata.nowPage});
});
app.get('/index', (req, res) =>{
  con.totalnum=data.subjects.length;
  con.nowpagesize=7;
  con.nowpagenum=req.query.pagenum;

  var chunk = _.chunk(data.subjects, con.nowpagesize)

  var pagedata={
    nowPage:con.nowpagenum,
    pageNum:(con.totalnum+con.nowpagesize-1)/con.nowpagesize
  };
  res.render('home', {layout: 'default',movies:chunk[con.nowpagenum-1],paging:Paging(pagedata),totnum:pagedata.pageNum,nowpage:pagedata.nowPage});
});
// app.get('/nowpagenum=:id', function(req, res){
//   con.nowpagenum=id;
//   res.render('home',{layout: 'default',movies:data.subjects,pagemessage:con});
// });
app.listen(8900);

function Paging(data){
    var nowPage = parseInt(data.nowPage);
    var pageNum = parseInt(data.pageNum);
    var content = [];
    var pre={}
    var pre = {};
    pre.index = 0;
    pre.text = '&lsaquo;';
    if (nowPage == 1) {
        pre.unclickable = true;
    }
    content.push(pre);
    if(pageNum <= 7){
        for(var i=1; i<=pageNum; i++){
            var pag={}
            pag.text=i;
            pag.index=i;
            if(nowPage==i){
              pag.unclickable=true;
              pag.cur=true;
            }
            content.push(pag);
        }
    }else if(nowPage <= 3){
        //当前页面小于等于展示页数总数的一半（向下取整），从1开始
        for(var i=1;i<= nowPage+2;i++){
            var pag={}
            pag.text=i;
            pag.index=i;
            if(nowPage==i){
              pag.unclickable=true;
              pag.cur=true;
            }
            content.push(pag);
        }
        var pag={};
        pag.text='...';
        pag.unclickable=true;
        content.push(pag);
        var pag={};
        pag.index=pageNum;
        pag.text=pageNum;
        content.push(pag);
    }
    else if(nowPage>3&&nowPage<pageNum-2){
        var pag={};
        pag.inde=1;
        pag.text=1;
        content.push(pag);
        var pag={};
        pag.text='...';
        pag.unclickable=true;
        content.push(pag);
        for(var i=nowPage-2; i<=nowPage+2; i++){
            var pag={}
            pag.text=i;
            pag.index=i;
            if(nowPage==i){
              pag.unclickable=true;
              pag.cur=true;
            }
            content.push(pag);
        }
        var pag={};
        pag.text='...';
        pag.unclickable=true;
        content.push(pag);
        var pag={};
        pag.inde=pageNum;
        pag.text=pageNum;
        content.push(pag);
    }else if(nowPage>=pageNum-2){
        var pag={};
        pag.inde=1;
        pag.text=1;
        content.push(pag);
        var pag={};
        pag.text='...';
        pag.unclickable=true;
        content.push(pag);
        for(var i=nowPage-2; i<=pageNum; i++){
            var pag={}
            pag.text=i;
            pag.index=i;
            if(nowPage==i){
              pag.unclickable=true;
              pag.cur=true;
            }
            content.push(pag);
        }
    }
    var next={};
    next.index=pageNum+1;
    next.text='&rsaquo;';
    if(nowPage==pageNum){
        next.unclickable=true;
    }
    content.push(next);
    return content;
}


