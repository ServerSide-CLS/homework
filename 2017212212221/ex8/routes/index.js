var express = require('express');
var mail=require('./mail');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.cookie('name', 'express');
  console.log('Cookies: ', req.cookies);
  res.render('home');
});

router.get('/email',(req,res)=>{
  var email=req.query.email;
  mail.mailObj.to=email;
  mail.transporter.sendMail(mail.mailObj, function (err, info) {  
    if (err) {  
      console.log(err);  
      return;  
    }  
    console.log('发送成功');
  });  
});

router.post('/',function(req,res){
  //console.log(req.body);
  var email1=req.body.Email;
  var vc=req.body.vc;
  var psd=req.body.psa;
  var psdagain=req.body.psdagain;

  var re=/^[\w.-]+@([0-9a-z][\w-]+\.)+[a-z]{2,3}$/i;
  if(!re.test(email1)){
    res.send("邮箱格式不正确");
    return;
  }
  if(psd!==psdagain){
    res.send("密码不一致");
    return;
  }
  if(vc!==mail.code){
    res.send("验证码错误");
    return;
  }
  
  //写入JSON文件
  var data={email:email1,psd:psd}
  let str = JSON.stringify(data,"","\t")
  fs.writeFile('user.json',str,function(err){
      if(err){
          console.error(err);
       }
      console.log("写入成功");
  });
  res.send("注册成功");
});

module.exports =router;