let express = require('express');
let router = express.Router();
let Handlebars=require("handlebars");
// let Handlebars=require("express-handlebars");

let ret = new Array();
let pageSize=8
let count=56;
let pageCount=count/pageSize


/* GET home page.初始化页面 */
router.get('/', function(req, res, next) {

  res.render('./partials/content', { //index视图文件 加载-->  layouts文件下的default布局文件
    entries:ret,
    pageSize:pageSize,    //页面的有几个产品
    pageCount:pageCount,  //页数
    count:count,          //记录条数
    pageNumber:1,   //当前页面号
     css:['/static/stylesheets/header.css','/static/stylesheets/content.css','/static/stylesheets/footer.css'],
  }); 
});


//查询路由
router.get('/goodslist',(req,res)=>{
  // res.send(req.query.pageNumber);
  let pageNum=req.query.pageNumber||1;

  for(let i=0;i<count;i++)
      ret.push({"name":"产品名"+i+"","nums":"数量","price":"价格"});
  
  res.render('./partials/content', { 
    entries:ret,
    pageSize:pageSize,    //页面的有几个产品
    pageCount:pageCount,  //页数
    count:count,          //记录条数
    pageNumber:pageNum,   //当前页面号
    css:['/static/stylesheets/header.css','/static/stylesheets/content.css','/static/stylesheets/footer.css'],
    
 });

});

module.exports = router;
