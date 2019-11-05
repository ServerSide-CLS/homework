var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    const entries = Array.from(Array(60), (v, k) => k)
    const pageSize = 8
    const pageCount = 7
    const page = req.query.page || 1
    const data = entries.slice((page - 1) * pageSize, page * pageSize)
    const pageCountList = Array.from(Array(pageCount), (v, k) => k + 1)
    res.render('body', {
      layout: 'default',
      page: page,
      pageCount: pageCount,
      pageCountList: pageCountList,
      data: data,
    });
  });
  
  module.exports = router;  