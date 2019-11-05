var express = require('express');
var router = express.Router();

/* GET home page. */
//创建路由和渲染模板
router.get('/', function(req, res, next) {
  const count = 40;
  const pageId = req.query.page || 1;  // 获取链接参数  
  const pageSize = 10;  //页规模
  const pageCount = Math.ceil(count/pageSize);  //页数
  const pageList = Array.from(Array(pageCount),(v,i) => i+1)  //页列表,Array.from()将其他对象转换为数组。
  const dataArray = Array.from(Array(10), (v,i)=>i + 10*pageId - 9);
  res.render('home', {
    layout: 'default', 
    params: 'm-home', 
    pageId,   
    pageCount,
    pageList,
    dataArray,
    count,
  });
});



module.exports = router;
