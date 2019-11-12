var express = require('express');
var nodemail = require('../server/nodemailer');
var tools  = require('../server/tools');

var router = express.Router();


/* GET users listing. */
router.get('/email',async function(req, res, next) {
    var email = req.query.email;  //前台ajax参数(get)
    var user_name = req.query.user_name;
    var code = await tools.createSixNum(); //生成六位随机数
    var date = new Date(); //获取当前时间
    var isLive = "no";

    req.session.code = code;   //保存验证码
    console.log("code",req.session.code);


    var mail = {
      //发件人
      from: '1160809932@qq.com',
      //主题
      subject: '邮箱验证',
      //收件人
      to: email,  //前台传过来的邮箱
      text: '注册验证码为'+ code //发送验证码 
    };
    
    nodemail(mail) //发送邮件
    res.send(req.session.code);
});



module.exports = router;
