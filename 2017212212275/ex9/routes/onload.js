//登陆页面路由
var express = require('express');
var router = express.Router();

/* GET content page. */
router.get('/', function(req, res, next) {
    res.render('onload.hbs');
  })
  

  //导出模块
  module.exports = router;