var express = require('express');
var fs = require('fs');

var router = express.Router();
var email = require('emailjs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//发送验证码到邮箱
router.post('/code',function (req,res,next) {
  const code = myRand();
  req.session.code = code;
  req.session.save();
  const guestEmail = req.body.email;
  const server  = email.server.connect({
    user:    "vxj555@qq.com",
    password:"qnmawlgjjztabdjd",
    host:    "smtp.qq.com",
    ssl:     true
  });
//开始发送邮件
  server.send({
    text:    "验证码："+code,       //邮件内容
    from:    "vxj555@qq.com",        //谁发送的
    to:      guestEmail,       //发送给谁的
    subject: "账号注册"          //邮件主题
  }, function(err) {
    //回调函数
    if(err===null){
      res.send("邮件发送成功");
    }
    else{
      res.send("邮件发送失败:"+err);
    }
  });


});

router.post('/register',function (req,res,next) {
  const email = req.body.email;
  const pwd = req.body.pwd;
  const rpwd = req.body.rpwd;
  const code = req.body.code;
  const key = req.session.code;
  //判断email格式
  const Reg =/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
  if(!Reg.test(email)){
    res.send("邮箱格式错误，注册失败");
    return
  }

  //判断密码是否等于确认密码
  if(pwd!==rpwd){
    res.send("两次输入的密码不一致，注册失败");
    return;
  }

  //判断验证码是否正确
  if(code!=key){
    res.send("验证码输入错误");
    return;
  }
  //存入user.json
  const user = {
    "email":email,
    "password":pwd
  };
  fs.appendFileSync("user.json",JSON.stringify(user));
  res.send("注册成功");
});
function myRand() {
  const x = 1000;
  const y = 9999;
  return parseInt(Math.random() * (x - y + 1) + y);
}

module.exports = router;
