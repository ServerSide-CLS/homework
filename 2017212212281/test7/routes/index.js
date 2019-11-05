  
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const items = Array.from(Array(70), (v, k) => k)
  const count = items.length
  const pageSize = 8
  const pageCount = Math.ceil(count / pageSize)
  const page = req.query.page || 1
  const data = items.slice((page - 1) * pageSize, page * pageSize)
  const pageCountList = Array.from(Array(pageCount), (v, k) => k + 1)
  res.render('index', {
    layout: 'default',
    page: page,
    pageCount: pageCount,
    pageCountList: pageCountList,
    data: data,
  });
});

module.exports = router;
