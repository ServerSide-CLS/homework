var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const entries = Array.from(new Array(68), (v, k) => k)
  const count = entries.length
  const pageSize = 8
  const pageCount = Math.ceil(count / pageSize)
  const page = req.query.page || 1
  const data = entries.slice((page - 1) * pageSize, page * pageSize)
  const pageCountList = Array.from(new Array(pageCount), (v, k) => {
    return {
      value: k + 1,
      ifCurrentPage: page == k + 1 ? true : false,
    }
  })
  
  res.render('index', {
    title: 'Express-hbs',
    page: page,
    pageCount: pageCount,
    pageCountList: pageCountList,
    data: data,
  });
});

module.exports = router;
