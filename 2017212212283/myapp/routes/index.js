var express = require('express');
var fs = require('fs');
var router = express.Router();

var items="";
fs.readFile('public/txt/input.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   items=data.toString();
});

/* GET home page. */

router.get('/', function(req, res, next) {
  
  const inputItem=items.split('\n');
  const num=inputItem.length;
  const pageSize=8;
  const pagenum=Math.ceil(num/pageSize);
  const page=req.query.page || 1;
  const data=inputItem.slice((page-1)*pageSize,page*pageSize);
  const pageLst=Array.from(Array(pagenum),(v,k)=>k+1);

  const nex=page-0+1>pagenum?pagenum:page-0+1;
  const pre=page-1||1;
  

  res.render('index', { 
    title: '产品列表目录' ,
    foot:'Copyright @ 2018-2019, Xia.',
    data:data,
    pageLst:pageLst,
    page:page,
    nex:nex,
    pre:pre,
  });
});

module.exports = router;
