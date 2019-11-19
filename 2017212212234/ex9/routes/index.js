var express = require('express');
var router = express.Router();
var fs=require('fs');
let nodemailer = require('./nodemailer');
var code = "";
var mongoose = require('./mongodb.js');

//创建Schema模型
var userScheMa = mongoose.Schema({
    email: String,
    username: String,
    password: String
});
  
//登录页
router.get('/login', (req, res, next) => {
  res.render('login');
})

var MyModel = mongoose.model('MyModel', userScheMa);
//随机生成验证码
function createCode() {
  let num = "";
  for (let i = 0; i < 6; ++i) {
    num += Math.floor(Math.random() * 10);
  }
  // console.log(num);
  return num;
}

//正则
function Test(email) {
    let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return str.test(email);
}

//获取验证码
router.get('/email',(req,res,next) => {
    code = createCode()
    nodemailer.sendMailS(req,res,code)
})


//渲染用户注册页面
router.get('/', (req, res, next) => {
    res.render('index');
});

//用户注册
router.post('/', function (req, res) {
  console.log(req.body);
  let email = req.body.email;
  let codeid = req.body.code;
  let password = req.body.password;
  let rePassword = req.body.ConfirmPassword;
  let name = req.body.username;

  //若缺少输入
  if (email == "") {
      res.send('请输入邮箱');
  }
  else if(codeid == ""){
      res.send('请输入验证码');
  }
  else if(password == ""){
      res.send('请输入密码');
  }
  else if(rePassword == ""){
      res.send('请再次输入密码');
  }
  if(Test(email))
  {
    if (codeid == code) 
    {
      if (password == rePassword) 
      {

        MyModel.find({ email: email }, function (err, data) {
          if (err) {
            console.log(err)
          }
          else {
            if (data.length != 0) {
              res.send("该邮箱已经被注册！");
            }
            else{
              res.send('注册成功！');

              //写入user.json
              fs.readFile('user.json','utf8',function (err, data){
                if(err){
                  console.log(err)
                }
                var newUser={'邮箱':email,"密码":password}
                var users=JSON.parse(data)
                users.data.push(newUser)
                var usersStr=JSON.stringify(users,"","\t")
                fs.writeFileSync('user.json',usersStr)
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
                  return res.render('login');
                }
              })

            }
          }
        })
      
      } 
      else {
          res.send('密码错误！');
      }
    } 
    else {
      res.send('验证码错误!');
    }
  }
  else {
    res.send('请输入正确邮箱!');
  }
});


//渲染用户登录
router.post('/login', (req, res, next) => {
  console.log(req.body);
  let password = req.body.password;
  MyModel.find({ email: req.body.email }, (err, response) => {
    if (response.length == 0) {
      res.send("您尚未注册！");
    }
    else if (response[0].password != password) {
      res.send("密码输入有误！");
    }
    else {
      res.render('index_2', { user: req.body.email });
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
       str += "<p>用户邮箱：" + data[i]["email"] + "</p>";
       str += "<p>用户密码：" + data[i]["password"] + "</p>";
     }
     res.render('admin',{message:str})
    }
  })
});
router.get('/index_2', (req, res) => {
  res.render("index_2");
})

module.exports = router;
