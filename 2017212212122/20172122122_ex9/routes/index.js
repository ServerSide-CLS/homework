var express = require('express');
var path = require('path');
var router = express.Router();
var sendMail = require('../email');
var fs = require('fs'); // 引入fs模块

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user');

var code;//验证码

//数据格式
var UserSchema = mongoose.Schema({
  email: String,
  pwd: String,
});
var User = mongoose.model("User", UserSchema);


/* GET home page. */

//注册页
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//注册验证
router.post('/varify',function(req,res){
  console.log(req.body);
  console.log(code);
  var checkEmail=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
　
  //格式判断
  if(req.body.pwd1!=req.body.pwd2)
    res.send("301");
  else if(!checkEmail.test(req.body.email))
    res.send("302");
  else if(code!=req.body.code)
    res.send("303");

    console.log("数据格式正确");

    //用户是否存在
    User.find({email: req.body.email}, 
    function(err, response){
       console.log(response.length);
       if(response.length!=0&&response!=""&&response!=null&&response!=[])
          res.send("501");
        else{
          var newUser = new User({
            "email":req.body.email,
            "pwd":req.body.pwd1
         });
      //写入
         newUser.save(function(err, User){
            if(err)
               res.send("500");
            else
               res.send("200");
         });
        }
 });

  
});

//邮件发送
router.post('/sendMail',function(req,res){
  console.log(req.body.addr);
  code = sendMail(req.body.addr);
})


//用户列表
router.get('/admin',function(req,res){
  User.find(function(err, response){
    console.log(response);
    res.json(response);
 });
})

//登录界面
router.get('/login',function(req,res){
  res.render('login');
})


//登录验证
router.post('/logincheck',function(req,res){
  console.log(req.body);
  User.find({email: req.body.email,pwd:req.body.pwd}, 
    function(err, response){
      console.log(response);
      if(response.length!=0&&response!=""&&response!=null&&response!=[]){
        res.send('200');
      }
      else{
        res.send("300");
      }
    });
})

//登录欢迎页面
router.get('/welcome',function(req,res){
  res.render('welcome');
})
module.exports = router;
