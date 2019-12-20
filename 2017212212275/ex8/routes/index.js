var express = require('express');
var router = express.Router();

/* GET content page. */
router.get('/', function(req, res, next) {
  res.render('content',
   { layout:   'default',
     params:   'm-home',
  });
})


//导出模块
module.exports = router;