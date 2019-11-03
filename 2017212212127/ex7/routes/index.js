var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  const allpages = Array.from(Array(50), (v, i) => i+1)
  const length = allpages.length;
  const pageSize = 8
  const pageCount = Math.ceil(length / pageSize)
  const page = req.query.page || 1
  const data = allpages.slice((page - 1) * pageSize, page * pageSize)
  const pageCountList = Array.from(Array(pageCount), (v, i) => i + 1)
  const prepage=page-1>0?page-1:1;
  const nextpage=parseInt(page)<parseInt(pageCount)?parseInt(page)+1:pageCount;
 
  res.render('home', {
  	prepage:prepage,
  	nextpage:nextpage,
    pageCountList: pageCountList,
    data: data,
  });
});

module.exports = router;