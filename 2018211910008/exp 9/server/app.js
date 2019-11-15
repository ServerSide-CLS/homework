var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var hbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const moment = require('moment');
const cors = require('cors');
const fs = require('fs');
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user");
var userSchema = mongoose.Schema({
  email:String,
  password:String
});
var user = mongoose.model("user", userSchema);


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

var opt = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60000 }
}

app.use(session(opt));
app.use(cors({
  origin:['http://127.0.0.1:8080'],
  methods:['GET','POST'],
  credentials: true
}));
app.use(cookieParser());
// 解决跨域问题



var transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  service: 'qq',
  secure: true,
  // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
  auth: {
    user: '2433989458@qq.com',
    pass: 'rshcmkikafwkeagg'
  }
});

function makeNumber(){
  let i =0;
  let number = "";
  for(i;i<6;i++){
    let randomNum = Math.floor(Math.random()*9+1);
    number = number + randomNum.toString();
  }
  return number;
}
const jsonParser = bodyParser.json();

app.post('/checkmail',jsonParser,function (req,res) {
    let emailAddress = req.body.body;
    const number = makeNumber();
    let html = `
      <div>您的验证码是：</div> <h1>
    `+ number+`</h1>`;
  req.session.emailNumber = number;
  var mailOptions = {
    // 发送邮件的地址
    from: '2433989458@qq.com', // login user must equal to this user
    // 接收邮件的地址
    to: emailAddress,  //
    // 邮件主题
    subject: '请查收验证码',
    // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
    html: html
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    res.status(200).json({message: "succeed"});
    console.log('Message sent: ' + info.response);
  });
});

app.post('/logup',jsonParser,function (req,res){
    var info = req.body;
    let number = Number(info.check);
    if(number == req.session.emailNumber){
      if(info.password == info.checkPassword){
        console.log(__dirname);
        let jsonInfo = JSON.stringify(info);


        //写入json
        fs.writeFile(path.resolve(__dirname + "/user.json"), jsonInfo, function (err, data) {
          if (err) {
            console.error(err);
          }
        });
        //写入Mongodb
        user.find({email: info.email},
          function(err, response){
            if(response.length == 0){
              var newUser = new user({
                email: info.email,
                password: info.password,
              });
              newUser.save(function(err, user){
                if(err)
                  res.json({message:"failed"});
                else
                  res.json({message:"succeed"});
              })
            }else{
              res.json({message:"该邮箱已经存在"})
            }
          });
      }
    }else{
      res.send("fail")
    }
});

app.post('/logincheck/',jsonParser,function (req,res) {
    let userInfo = req.body;
    let email = userInfo.email;
    let password = userInfo.password;
    console.log(password);
    user.find({email:email,password:password},(err,response)=>{

      console.log(response);
      if(response.length == 0){
        res.json({message:"邮箱或密码错误"});
        return;
      }
      if(err) res.json({message: "登陆有问题！"});
      else res.json({message: "登陆成功！"});
    })
});

app.listen(3000,response => {console.log('hahaha')});
