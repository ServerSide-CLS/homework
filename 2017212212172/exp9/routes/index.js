var express = require('express');
var router = express.Router();
var nodemailer=require("nodemailer");
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_db',{ useNewUrlParser: true,useUnifiedTopology: true });
var personSchema = mongoose.Schema({
  admin: String,
  password: String,
  email: String,
});
var Person = mongoose.model("Person", personSchema,"User");
var checkcode="";
var NowEmail="";
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
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {layout: 'signup'});
});
router.get('/login', function(req, res, next) {
  res.render('main', {layout: 'login'});
}); 
router.get('/admin', function(req, res, next) {
  Person.find(function(err, response){
    res.render('main', {layout: 'personList',people:response});
 });
}); 
router.get('/index', function(req, res, next){
  res.render('main', {layout: 'index'});
})
router.post('/sendCode',function(req, res){
    checkcode=createcode(6);
    NowEmail=req.body.email;
    Person.find({email:req.body.email},
      function(err,response){
        console.log(response);
        if(Object.keys(response).length!=0){
          res.write("0");
          res.end();
        }
        else {
          var mailObj = {
            from: 'liexss_liu@163.com', // 发送方邮箱及标题
            to: NowEmail+",liexss_liu@163.com", // 对方邮箱地址
            subject: 'A Email from checkcode', // 
            text: "验证码为："+checkcode+"        防止泄露！！！！！！！！！！", // 邮件内容
          };
          transporter.sendMail(mailObj);
          res.write("1");
          res.end();
        }
      }
    );
}); 
router.post('/signup',function(req,res){
  console.log(req.body);
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
    Pdata=new Person({
      admin:req.body.admin,
      password:req.body.password,
      email:req.body.email
    });
    console.log(Pdata);
    Person.find({admin:req.body.admin},
      function(err,response){
        console.log(response);
        if(Object.keys(response).length==0){
          Pdata.save(function(err, Person){
            if(err)
             res.send("数据库error");
            else
             res.send("注册成功");
          });
        }
        else {
          res.send("该用户名已存在");
        }
      }
    );
  }
});
router.post('/loginup',function(req,res){
  console.log(req.body);
  Person.find({admin:req.body.admin,password:req.body.password},
    function(err,response){
      if(Object.keys(response).length==0){
        res.redirect('/login');
      }
      else {
        res.redirect('/index');
      }
    }
  );
});
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});



module.exports = router;
