var express = require('express');
var app = express();
var router = express.Router();
var nodemailer = require('../router/nodemailer');
var fs = require("fs");
var bodyParser = require('body-parser');
var Users = require('../public/javascripts/connect');

var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

//解析 application/json
app.use(bodyParser.json()); 
// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 


//随机生成验证码
var code = "000000";
function createCode() {
  let num = "";
  for (let i = 0; i < 6; ++i) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

 /* GET home page. */
router.get('/', function (req, res, next) {
   res.render('index');
 });

// 发送邮件
router.get('/email', function (req, res, next) {
  code = createCode();
  console.log(code);  //输出验证码
  nodemailer.sendMailFn(req, res, code);
});

//获取表单项
router.post('/',function(req,res){
  var email = req.body.email;
  let verification = req.body.verification;
  let password = req.body.password;
  let rePassword = req.body.rePassword;

  //表单项验证
  if (email == "") {
    res.send("请填写邮箱");
  } else if (verification == "") {
    res.send("请填写验证码");
  } else if (password == "") {
    res.send("请填写密码");
  } else if (rePassword == "") {
    res.send("请重复密码");
  } else {
    if (reg.test(email)) {
      if (verification == code) {
        if (password == rePassword) {

           //查询email是否存在
          Users.findOne({'email':email},function(err,user){
            if(err){
              console.log(err);
              return;
            }
            else{
              if(user == null){
                var newUser = new Users({
                  email:email,
                  code:code,
                  password:password
                });
                newUser.save(function(err,Users){
                  if(err){
                    console.log(err);
                    return;
                  }else{
                    console.log("email不存在,可注册");
                  }
                });
                res.send("注册成功!");
                res.render("login",{message:"注册成功"});
              }
              else{
                if(user.password == ''){
                  user.code = code;
                  user.save(function(err,updatedUser){
                    if(err){
                      console.log(err);
                      return;
                    }
                  });
                }
                else{
                  console.log("email已存在，不允许注册");
                  res.render("login",{message:"email已存在"});
                }
              }
            }
          });
          
        } else {
          res.send("密码不相同！");
        }
      } else {
        res.send("验证码错误!");
      }
    } else {
      res.send("邮箱错误!");
    }
  }
});

module.exports = router;