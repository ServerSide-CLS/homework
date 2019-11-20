var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  const items = Array.from({length:35}, (v, k) => k + 1)
  const count = items.length
  const pages = 8
  const pageNum = Math.ceil(count / pages)
  const pageNow = req.query.page || 1
  const flagLeft = pageNow==1?false:true;
  const flagRight = pageNow==pageNum?false:true;
  const data = items.slice((pageNow - 1) * pages, pageNow * pages)
  const pageCountList = Array.from(Array(pageNum), (v, k) => k + 1)
  res.render('index', {
    layout: 'default',
    pageNum: pageNum,
    pageCountList: pageCountList,
    data: data,
		flagLeft: flagLeft,
		flagRight: flagRight,
		left: parseInt(pageNow)-1,
		right: parseInt(pageNow)+1
  });
});

module.exports = router;
