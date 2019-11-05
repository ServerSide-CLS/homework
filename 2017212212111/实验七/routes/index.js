var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const totalpages = Array.from(Array(50), (v, i) => i+1)/*创建0-50的伪数组*/
  const length = totalpages.length;
  const pageSize = 8
  const pageCount = Math.ceil(length / pageSize)
  const page = req.query.page || 1/*当前页数*/
  const data = totalpages.slice((page - 1) * pageSize, page * pageSize)
  const prepage=page-1>0?page-1:1;
  const nextpage=parseInt(page)<parseInt(pageCount)?parseInt(page)+1:pageCount;
  const pageCountList = Array.from(Array(pageCount), (v, i) => i + 1)
  
  res.render('home', {
  	prepage:prepage,
  	nextpage:nextpage,
    pageCountList: pageCountList,
    data: data,
  });

});

module.exports = router;
