var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

var a = require('../public/javascript/sixNum.js');

let mailTransport = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: '13736290450@163.com', //注册的163邮箱账号
        pass: 'ldl19981210' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
    }
  });

  router.get('/', function(req, res){
    var mail = {
      // 发件人
      from: '<13736290450@163.com>',
      // 主题
      subject: '接受凭证',//邮箱主题
      // 收件人
      to:req.query.e_mail,//前台传过来的邮箱
      // 邮件内容，HTML格式
      text: '用'+a.sixNum+'作为你的验证码'//发送验证码
    };
    
    mailTransport.sendMail(mail, function(error, info){
      if(error) {
          return console.log(error);
      }
      console.log('mail sent:', info.response);
    });
    
})

module.exports = router;
