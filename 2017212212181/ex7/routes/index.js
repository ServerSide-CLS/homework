var express = require('express');
var router = express.Router();
var handlebars = require("handlebars");

var ret = new Array();
var pageSize=8
var count=56;
var pageCount=count/pageSize;
for(var i=1;i<=count;i++)
     ret.push({"name":"产品"+i});

/* GET home page.初始化页面 */
router.get('/', function(req, res, next) {
  res.render('./partials/content', {
    entries:ret,
    pageSize:pageSize,
    pageCount:pageCount,
    count:count,
    pageNumber:1,
     css:['/static/stylesheets/header.css','/static/stylesheets/content.css','/static/stylesheets/footer.css'],
  }); 
});

//查询路由
router.get('/goodslist',(req,res)=>{
  let pageNum=req.query.pageNumber;
  res.render('./partials/content', { 
    entries:ret,
    pageSize:pageSize,
    pageCount:pageCount,
    count:count,
    pageNumber:pageNum,
    css:['/static/stylesheets/header.css','/static/stylesheets/content.css','/static/stylesheets/footer.css'],
 });
});

module.exports = router;
