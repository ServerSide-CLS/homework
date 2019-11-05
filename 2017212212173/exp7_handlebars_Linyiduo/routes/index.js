const express = require('express');
const utils = require('../utils/getBookList');
const router = express.Router();

router.get('/', function(req, res, next) {
  let pageNow = req.query.pageNow ? req.query.pageNow : 1;
  let content = utils.getBookList(pageNow);
  res.render('content', {...content});
});

module.exports = router; 