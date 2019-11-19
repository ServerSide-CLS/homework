var express = require('express');
var mail=require('./mail');
var fs = require('fs');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error',(err)=>{
    db.close();
    return console.error(err);
});

db.once('open',()=>{
    console.log('mongodb was connected');
});

mongoose.connect('mongodb://127.0.0.1:27017/new_db');

//创建schema
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
    console.log('success');
  });  
});

router.get('/admin',(req,res)=>{
  User.find((err,response)=>{
    res.render('admin',{adminInfo:response});
  })
});

router.post('/login',(req,res)=>{
  User.find({email:req.body.loginEmail},(err,response)=>{
    if(response.length===0)
      res.redirect('/');
    else if(response[0].psd==req.body.loginPsd)
      res.render('index',{admin:req.body.loginEmail});
    else
      res.redirect('/');
  });
});

router.post('/register',function(req,res){

  var input_email=req.body.Email;
  var vc=req.body.vc;
  var psd=req.body.psa;
  var psdagain=req.body.psdagain;

  //检测邮箱，密码
  var re=/^[\w.-]+@([0-9a-z][\w-]+\.)+[a-z]{2,3}$/i;
  if(!re.test(input_email)){
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

  User.find({email:input_email},function(err, response){
    if(response.length!==0){
      res.send("该邮箱用户已经存在");
    }else{
     //写入mongo
      var newUser=new User({
         email:input_email,
         psd:psd
      });
      newUser.save(function(err, User){
        if(err){
          res.render('show_message', {message: "Database error", type: "error"});
        }else{
          res.render('show_message', {message: "New user added", type: "success", user:input_email});
        }
       });
    }
  });
});
module.exports =router;