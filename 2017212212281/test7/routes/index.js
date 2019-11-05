var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const items = Array.from(Array(51), (v, k) => k)
  const count = items.length
  const pages = 8
  const pageNum = Math.ceil(count / pages)
  const pageNow = req.query.page || 1
  const data = items.slice((pageNow - 1) * pages, pageNow * pages)
  const pageCountList = Array.from(Array(pageNum), (v, k) => k + 1)
  res.render('index', {
    layout: 'default',
    pageNum: pageNum,
    pageCountList: pageCountList,
    data: data,
  });
});

module.exports = router;
