var express = require('express');
var nodemailer = require('./nodemailer');
var check = require('./check');
var creatCode = require('./creatCode')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('login');
});

//发送邮件
router.get('/email', function (req, res, next) {
  code = creatCode.createCode();
  // check.chekEmail(req, res);
  nodemailer.sendMailFn(req,res,code);
})

// 数据校验
router.post('/',function(req,res){
  check.chechAll(req,res);
})

module.exports = router;
