var nodemailer=require("nodemailer");
var express = require('express');
var fs=require('fs');
var router = express.Router();

var transporter=nodemailer.createTransport({//邮件传输
  host:"smtp.qq.com", //qq smtp服务器地址
  secureConnection:false, //是否使用安全连接，对https协议的
  port:465, //qq邮件服务所占用的端口
  auth:{
      user:"1006166176@qq.com",//开启SMTP的邮箱，有用发送邮件
      pass:""//授权码
}
});
//验证码
let code="";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("signUp",{ js: ["/javascripts/jquery-3.3.1.min.js",'/javascripts/myJS.js']});
});

router.post('/', function(req, res, next) {
  let email=req.body.email;
  let checkCode=req.body.checkCode;
  let pwd=req.body.pwd;
  let comfirmPwd=req.body.comfirmPwd;
  let message="";

  //验证各项信息的合法性
  let reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if(!reg.test(email)){
    message+="邮箱不合法 "
  }
  if(checkCode!=code||code=="")
    message+="验证码错误 "
  if(pwd!=comfirmPwd||pwd=="")
    message+="密码不一致 "

  if(message!="") //如果信息不合法则显示错误提示
    res.render('signUp',{message:message,js: ["/javascripts/jquery-3.3.1.min.js",'/javascripts/myJS.js']})
  else{ //验证通过后，渲染注册成功信息，并将验证通过的邮箱和密码信息加入user.json文件
    res.render('success')

    fs.readFile('user.json','utf8',function (err, data){
      if(err)
        console.log(err)
      var newUser={'emailbox':email,"password":pwd}
      var users=JSON.parse(data)
      users.data.push(newUser)
      var usersStr=JSON.stringify(users,"","\t")
      fs.writeFileSync('user.json',usersStr)
    })
  
  }
});

 //js中点击发送邮件按钮后，使用ajax访问/sendMail路由
router.get('/sendEmail',(req,res,next)=>{

  while(code.length<5){
      code+=Math.floor(Math.random()*10);
  }
  var mailOption={
      from:"1006166176@qq.com",
      to:req.query.email,//收件人
      subject:"注册校验码",//纯文本
      html:"<h1>欢迎注册XX系统，您本次的注册验证码为："+code+"</h1>"
  };
  transporter.sendMail(mailOption,function(error,info){
      if(error){
          return console.info(error);
      }
  })

})
module.exports = router;
