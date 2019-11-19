var express = require('express');
var router = express.Router();
var a = require('../public/javascript/sixNum.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_db');

const conn = mongoose.connection
var msg = "";
conn.on('error', function (err) {
  msg = '连接数据库失败'
});

var userSchema = mongoose.Schema({
  user: String,
  password: String
});
var users = mongoose.model("Person", userSchema);

//获得所有用户名单路由
router.get('/admin', function(req, res){
  users.find(function(err, response){
      res.json(response);
  });
});

router.get('/', function(req, res,next){
  res.render('home',{msg:""});
});

//渲染registered表单//注册路由
router.get('/registered', function(req, res,next){
  res.render('registered',{msg:msg})
});

//注册路由提交表单
router.post('/registered', function(req, res){
  var userInfo = req.body;//获得表单信息
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;//用来判断邮箱格式
  var isInUser = false;//isIisnUser判断email是否已经注册
  users.find({user:userInfo.email}, 
    function(err,response){
      console.log(response);
      if(err){
        res.send("数据库连接出错");
      }
      if(response && response!=""){
        isInUser = true;
      }
    if(reg.test(userInfo.email)){//判断邮箱格式
      if(!isInUser){//判断email是否已经注册
        if(userInfo.pwd == userInfo.pwd_again){//判断两次密码是否相同
          if(userInfo.ValidateCode == a.sixNum){//判断6为验证码是否相同
            //往user.josn文件里写入用户名和密码
            var newUser = new users({
              user: userInfo.email,
              password: userInfo.pwd,
            });
            newUser.save(function(err, Person){
              if(err)
                  res.render('show_message', {message: "Database error", type: "error"});
              else
                  res.render('show_message', {message: "New person added", type: "success", user: userInfo});
            });
          }
          else{
            res.render("registered",{msg:"验证码错误"});
          }
        }
        else{
          res.render("registered",{msg:"两次密码不匹配"});
        }
      }
      else{
        res.render("registered",{msg:"此邮箱已被注册"});
      }
    }
    else{
      res.render("registered",{msg:"邮箱格式有误"});
    }
  });
});

//登陆路由
router.get('/login', function(req, res){
  res.render('login',{msg:msg});
});

router.post('/login', function(req, res){
  var userInfo = req.body; //Get the parsed information

  if(!userInfo.user || !userInfo.password){
    res.render("login",{msg:"有空输入"});
  } else {
     
     users.find({user:userInfo.user},function(err,response){
      let data = JSON.stringify(response);
      var data1 = eval(data);
      
      if(response && response!=""){
        if(userInfo.password == data1[0].password){
          res.render("index");
        }
        else{
          res.render("login",{msg:"密码错误"});
        }
      }
      else{
        res.render("login",{msg:"账户错误"});
      }
     });
  }
});

module.exports = router;




