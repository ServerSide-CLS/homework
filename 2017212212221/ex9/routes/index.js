var express = require('express');
var mail=require('./mail');
var fs = require('fs');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_db');

//mongo设置
var userSchema = mongoose.Schema({
  email: String,
  psd: String,
});
var User = mongoose.model("User", userSchema);

/* GET home page. */
router.get('/', function(req, res) {
  res.cookie('name', 'express');
  console.log('Cookies: ', req.cookies);
  res.render('login');
});

router.get("/register",(req,res)=>{
  res.render('register');
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

router.get('/admin',(req,res)=>{
  User.find((err,response)=>{
    res.render('admin',{adminInfo:response});
  })
});

router.post('/login',(req,res)=>{
  User.find({email:req.body.loginEmail},(err,response)=>{
    if(response.length===0)res.redirect('/');
    else if(response[0].psd==req.body.loginPsd)res.render('index',{admin:req.body.loginEmail});
    else res.redirect('/');
  });
});

router.post('/register',function(req,res){
  //console.log(req.body);
  var email1=req.body.Email;
  var vc=req.body.vc;
  var psd=req.body.psa;
  var psdagain=req.body.psdagain;

  //注册前检测
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

  User.find({email:email1},function(err, response){
    if(response.length!==0){
      res.send("该邮箱用户已经存在");
    }else{
     //写入mongo
      var newUser=new User({
         email:email1,
         psd:psd
      });
      newUser.save(function(err, User){
        if(err){
          res.render('show_message', {message: "Database error", type: "error"});
        }else{
          res.render('show_message', {message: "New user added", type: "success", user:email1});
        }
       });
    }
  });
});
module.exports =router;