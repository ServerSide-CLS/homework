var express = require('express');
var nodemail = require('../server/nodemailer');
var tools  = require('../server/tools');
var Person = require('../server/db');

var router = express.Router();


/* GET users listing. */
router.get('/email',async function(req, res, next) {
  console.log('res.query',req.query.email)
  if(!req.query.email){
    console.log(1);
    return res.end();
  }
    var email = req.query.email;  //前台ajax参数(get)
    var user_name = req.query.user_name;
    var code = await tools.createSixNum(); //生成六位随机数
    var date = new Date(); //获取当前时间
    var isLive = "no";

    req.session.code = code;   //session保存验证码
    console.log("code",req.session.code);

    //邮箱注册检验
    Person.find({email}, function(err, response){
      if(response.length!=0){  //判断数组是否为空
          console.log('邮箱已注册')
          console.log('res',response);
          res.send('邮箱已注册');
      }
      else{
          console.log('res',response);
          console.log('邮箱未注册');
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
          res.send('邮箱可用');
      }
  });

});



module.exports = router;
