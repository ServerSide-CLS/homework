var express = require('express');
var fs = require('fs');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.clearCookie('Captcha');
  res.render('index', { title: 'registration' });
});

router.post('/mail',function(req,res){
  var transporter = nodemailer.createTransport({
    service:'qq',
    auth:{
      user:'568695093@qq.com',
      pass:'tpsfgmlrrgrzbdde'
    }
  });
  var option={
    from:"568695093@qq.com",
    to:req.body.email,
    subject:"验证码",
    html:"<h2>注册验证码为：" + req.body.Captcha + "</h2>"
  };
  transporter.sendMail(option, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
  });
});

router.post('/',function(req,res){
  var rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if(!rule.test(req.body.email)){
    res.send("请输入正确的邮箱");
  }
  else if(req.body.code !== req.cookies.Captcha){
    res.send("请输入正确的验证码");
  }
  else if(req.body.pwd !== req.body.pwd_again){
    res.send("密码与确认密码不一致");
  }
  else{
    var obj = {email:req.body.email,password:req.body.pwd};
    fs.readFile('user.json',function(err,data){
      var source = data.toString();      
      source = JSON.parse(source);
      source.data.push(obj);
      fs.writeFile('user.json',JSON.stringify(source),function(err){
        if(err){
          return console.log(err);
        }
      });
    })
    res.send("注册成功!");   
  }
});

module.exports = router;