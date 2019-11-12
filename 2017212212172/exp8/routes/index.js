var express = require('express');
var router = express.Router();
var nodemailer=require("nodemailer");
var Users = require('./Users');
var fs = require('fs');
var checkcode="";
var NowEmail="";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout');
});
// router.post('/signup',function(req,res){
//   console.log(req.body);
// });
var transporter = nodemailer.createTransport({
  host: 'smtp.163.com', 
  port: 465, // 端口号
  secure: true, 
  auth: {
      user: "liexss_liu@163.com", // 发送方邮箱地址
      pass: "123456789lie" // smtp 验证码
  }
});
function createcode(len){
  var arr=[];
  var code="";
  for(var i=0;i<=9;i++){
      arr.push(i);
  }
  for(var i=65;i<=90;i++){
      arr.push(String.fromCharCode(i));
      arr.push(String.fromCharCode(i+32));
  }
  for(var i=0;i<len;i++){
      var index =parseInt(Math.random()*arr.length);
      code+=arr[index];
  }
  return code;
}  
router.post('/sendCode',function(req, res){
    checkcode=createcode(6);
    NowEmail=req.body.email;
    var mailObj = {
      from: 'liexss_liu@163.com', // 发送方邮箱及标题
      to: NowEmail+",liexss_liu@163.com", // 对方邮箱地址
      subject: 'A Email from checkcode', // 
      text: "验证码为："+checkcode+"        防止泄露！！！！！！！！！！", // 邮件内容
    };
    transporter.sendMail(mailObj);
    res.write('success');
    res.end();
}); 
router.post('/signup',function(req,res){
  if(checkcode==""){
    res.send('请先发送验证码');
  }
  else if(checkcode!=req.body.vercode){
    res.send('验证码输入错误');
  }
  else if(req.body.password!=req.body.repassword){
    res.send('两次密码输入不一致');
  }
  else if(req.body.email!=NowEmail){
    res.send('邮箱与发送验证码邮箱不符');
  }
  else {
    Pdata={
      admin:req.body.admin,
      password:req.body.password,
      email:req.body.email
    }
    fs.readFile('Users.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        var flag=0;
        person.data.forEach(element => {
          if(element.admin==req.body.admin){
            flag=1;
          }
        });
        if(flag==0){
          person.data.push(Pdata);
          var str = JSON.stringify(person,"","\t");
          fs.writeFile('Users.json',str,function(err){
              if(err){
                  console.error(err);
              }
          });
        }
        else {
          res.send('该账号已存在');
        }
    });
    // var flag=0;
    // if (Users.length>0) {
    //   Users.filter((user)=>{
    //     if(user.id === req.body.id){
    //       res.send('用户名已存在');
    //     }else{
    //       var newUser = {id: req.body.id, password: req.body.password};
    //       Users.push(newUser);
    //       req.session.user = newUser;
    //       res.redirect('protected');
    //     }
    //   })
    // }else{
    //   var newUser = {id: req.body.id, password: req.body.password};
    //   Users.push(newUser);
    //   req.session.user = newUser;
    //   res.redirect('protected');
    // }
  }
});
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});



module.exports = router;
