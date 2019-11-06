var express = require('express');
var router = express.Router();
var handlebars = require("handlebars");

var ret = new Array();
var pageSize=8
var count=50;
var pageCount=count/pageSize;
for(var i=1;i<=count;i++)
     ret.push({"name":"第" + i +"个产品"});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./partials/content', {
    entries:ret,
    pageSize:pageSize,
    pageCount:pageCount,
    count:count,
    pageNumber:1,
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
 });
});

module.exports = router;
