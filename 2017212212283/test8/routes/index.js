var express = require('express');
var nodemailer=require('nodemailer');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.clearCookie('Captcha');
  res.render('index', { title: '用户注册页面' });
});

router.post('/mails', function(req,res){
  console.log(req.body);

  var transporter = nodemailer.createTransport({
    service:"qq",
    auth:{
      user:'272930349@qq.com',
      pass:'jepmnacndzvfbjgf'
    }
  });

  var mailOption={
    from:"272930349@qq.com",
    to:req.body.mail,
    subject:"注册校验码",
    html:"<h1>您本次的注册验证码为："+req.body.Captcha+"</h1>"
  };

  transporter.sendMail(mailOption, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
 
    console.log('发送成功');
  });
})


router.post('/',function(req,res){
  console.log(req.body);
  console.log(req.cookies);

  var re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;

  var isOk=true;
  if(isOk===true&&!re.test(req.body.email)){
    res.send('邮箱格式错误');
    isOk=false;
  }

  if(isOk===true&&req.body.password!==req.body.passwordAgain){
    res.send('两次密码输入不同');
    isOk=false;
  }
  
  if(isOk===true&&req.cookies.Captcha!==req.body.Captcha){
    res.send('验证码输入错误');
    isOk=false;
  }

  if(isOk===true){
    var obj = { email:req.body.email, password:req.body.password};
    var flag=0;
    fs.readFile('user.json',function(err,data){
      if (err) {
        return console.error(err);
      }
      var source=data.toString();
      source = JSON.parse(source);

      for(var i=0;i<source.data.length;i++){
        console.log(source.data[i].email);
        console.log(obj.email);
        if(source.data[i].email===obj.email){
          flag=1;
          break;
        }
      }

      if(!flag)
        source.data.push(obj);
      
      fs.writeFile('user.json',  JSON.stringify(source), function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
      });

      if(flag===0)
        res.send('注册成功');
      else
        res.send('用户已注册');
    })
  }
})

module.exports = router;