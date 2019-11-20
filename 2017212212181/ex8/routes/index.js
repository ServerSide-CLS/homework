var express = require('express');
var router = express.Router();
var nodemailer = require('./nodemailer');
var fs = require("fs");

var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

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

//发送邮件
router.get('/email', function (req, res, next) {
  code = createCode();
  console.log(code);
  nodemailer.sendMailFn(req, res, code);
});

//获取表单项 post
router.post('/', function (req, res) {
  let email = req.body.email;
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
          //写入user.json
          var data = "{\n" +
            "  \"email\": \"" + email + "\",\n" + "  \"password\": \"" + password + "\"\n" + "}\n";
          fs.appendFile("user.json", data, (error) => {
            if (error) return console.log("添加失败" + error.message);
            console.log("添加成功");
          });
          
          res.send("注册成功!");
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