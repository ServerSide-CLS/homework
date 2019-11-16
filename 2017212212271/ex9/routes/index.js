var express = require('express');
var router = express.Router();
let nodemailer = require('./nodemailer');
var mongoose = require('./mongodb.js');
let codeID = "";
//  创建模型
var userScheMa = mongoose.Schema({
  email: String,
  username: String,
  password: String
});

var MyModel = mongoose.model('MyModel', userScheMa);
function createCode() {
  let num = "";
  for (let i = 0; i < 6; ++i) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}
function Test(email) {
  let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return str.test(email);
}
//获取邮箱验证码
router.get('/email', (req, res, next) => {
  codeID = createCode()
  console.log("codeID", codeID);
  nodemailer.sendMailS(req, res, codeID)
})

//用户注册页面渲染
router.get('/', (req, res, next) => {
  res.render('index');
});

//用户逻辑注册
router.post('/', (req, res) => {
  console.log(req.body);
  let name = req.body.username;
  let email = req.body.email;
  let codeid = req.body.code;
  let password = req.body.password;
  let rePassword = req.body.ConfirmPassword;
  if (email === "") {
    res.send('ERROR:you have not fill in the email');
  } else if (codeid === "") {
    res.send('ERROR:you have not fill in the code');
  } else if (password === "") {
    res.send('ERROR:you have not fill in the password');
  } else if (rePassword === "") {
    res.send('ERROR:you have not fill in the confirmpassword');
  } else if (Test(email) != true) {
    console.log("3")
    res.send('ERROR:please fill in the correct email');
  } else if (codeid != codeID) {
    console.log("4")
    res.send('ERROR:identification code is not correct');
  } else if (password != rePassword) {
    console.log("5")
    res.send('ERROR:password is disaccord');
  } else {
    console.log("2")
    MyModel.find({ email: email }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        if (data.length != 0) {
          res.send("ERROR:email has been registered!");
        }
      }
    })
    MyModel.create({
      email: email,
      username: name,
      password: password
    }, function (err, data) {
      if (err) {
        console.log(err)
      }
      else{
        res.render('login');
      }
    })
 }
});

//用户登录页面
router.get('/login', (req, res, next) => {
  res.render('login');
})

//用户登录路由渲染
router.post('/login', (req, res, next) => {
  console.log(req.body);
  let password = req.body.password;
  MyModel.find({ email: req.body.email }, (err, response) => {
    if (response.length == 0) {
      res.send("you haven't registered");
    }
    else if (response[0].password != password) {
      res.send("password is incorrect");
    }
    else {
      res.render('index1', { user: req.body.email });
    }
  })
});
//查看用户信息
router.get('/admin', (req, res) => {
  let str = "";
  MyModel.find({},(err, data) => {
    if(err)
    {
      console.log(err)
    }else{
     for(var i = 0 ;i < data.length; i++){
       str += "<p>email:" + data[i]["email"] + "</p>";
       str += "<p>password:" + data[i]["password"] + "</p><tr>";
     }
     res.render('admin',{message:str})
    }
  })
});
router.get('/index1', (req, res) => {
  res.render("index1");
})
module.exports = router;