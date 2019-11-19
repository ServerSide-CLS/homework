var express = require('express');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer  = require('nodemailer');
var svgCaptcha = require('svg-captcha');
var multer = require('multer');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/experiment', {
  useNewUrlParser:true,
  useUnifiedTopology: true
});

var router = express.Router();
var User = mongoose.model("User", mongoose.Schema({
  email:    String,
  password: String
}));
var mailTransport = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: true,
  auth: {
      user: '2597795315@qq.com',
      pass: 'wefscmixduzfbded'
  },
});
var captchaSetting = {
  inverse:      false,
  ignoreChars:  '0o1ilI',
  fontSize:     64,
  noise:        5,
  color:        true,
  width:        320,
  height:       120,
};
var cssList = [
  "/stylesheets/footer.css",
  "/stylesheets/header.css",
];
var fileDir = 'resourse/user.json';
var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

// 以下处理发送验证码的请求

router.post('/captcha/', bodyParser.json(), (req, res, next) => {
  console.log(req.body);
  next();
});

router.post('/captcha/', (req, res, next) => {
  emailReg.test(req.body.email)?
  next(): 
  res.send({
    code: 500,
    msg: "邮箱格式错误"
  });
});

router.post('/captcha/', (req, res, next) => {
  User.find({email: req.body.email}, (err, response) => {
    if(err){
      console.error(err);
      res.send({
        code: 500,
        msg: "数据库错误"
      });
    }
    else{
      res.db = response;
      next();
    }
  });
});

router.post('/captcha/', (req, res, next) => {
  (res.db.length === 0)?
  next():
  res.send({
    code: 500,
    msg: "该邮箱已被注册"
  });
});

router.post('/captcha/', (req, res, next) => {
  res.captcha = svgCaptcha.create(captchaSetting);
  next();
});

router.post('/captcha/', (req, res, next) => {
  res.emailOption = {
    from    : '<2597795315@qq.com>',
    to      : `<${req.body.email}>`,
    subject : 'Captcha',
    text    : 'Captcha',
    html    : `<h2>Here is your Captcha Code</h2><p>${res.captcha.data}</p>`,
  };
  next();
});

router.post('/captcha/', (req, res, next) => {
  mailTransport.sendMail(res.emailOption, (err, msg) => {
    err?
    res.send({
      code: 500,
      msg: "发送邮件失败"
    }):
    next();
  });
});

router.post('/captcha/', (req, res, next) => {
  req.session.email = req.body.email;
  next();
});

router.post('/captcha/', (req, res, next) => {
  req.session.captcha = res.captcha.text.toLowerCase();
  next();
});

router.post('/captcha/', (req, res, next) => {
  res.send({
    code: 200,
    msg: "成功发送验证邮件"
  });
});

// 以下处理获取注册页面的请求

router.get('/', (req, res, next) => {
  res.render('register', {
    title: '注册',
    cssList: cssList,
  });
});

// 以下处理提交注册信息的请求

router.post('/', bodyParser.json(), (req, res, next) => {
  console.log(req.body);
  next();
});

router.post('/', (req, res, next) => {
  emailReg.test(req.body.email)?
  next(): 
  res.send({
    code: 500,
    msg: "邮箱格式错误"
  });
});

router.post('/', (req, res, next) => {
  (req.body.email === req.session.email 
  && req.body.captcha.toLowerCase() === req.session.captcha)?
  next():
  res.send({
    code: 500,
    msg: "验证码错误"
  });
});

router.post('/', (req, res, next) => {
  (req.body.password === '')?
  res.send({
    code: 500,
    msg: "密码不能为空"
  }):
  next();
});

router.post('/', (req, res, next) => {
  (req.body.password === req.body.passwordConfirm)?
  next():
  res.send({
    code: 500,
    msg: "两次输入密码不一致"
  });
});

router.post('/', (req, res, next) => {
  User.find({email: req.body.email}, (err, response) => {
    if(err){
      console.error(err);
      res.send({
        code: 500,
        msg: "数据库错误"
      });
    }
    else{
      res.db = response;
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  (res.db.length === 0)?
  next():
  res.send({
    code: 500,
    msg: "该邮箱已被注册"
  });
});

router.post('/', (req, res, next) => {
  new User({
    email: req.body.email,
    password: req.body.password
  }).save((err, User) => {
    if(err){
      console.error(err);
      res.send({
        code: 500,
        msg: "数据库错误"
      });
    }
    else{
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  res.send({
    code: 200,
    msg: "注册成功"
  });
});

// 以下处理获取admin页面的请求

router.get('/admin/', (req, res, next) => {
  User.find((err, response) => {
    if(err){
      console.error(err);
      res.status(500);
    }
    else{
      res.render('admin', {
        title: 'Admin',
        cssList: cssList,
        users: response
      });
    }
  });
});

// 以下处理获取用户登录页面的请求

router.get('/login/', (req, res, next) => {
  res.render('login', {
    title: '用户登录',
    cssList: cssList,
  });
});

// 以下处理提交用户登录信息的请求

router.post('/login/', multer().array(), (req, res, next) => {
  User.find({
    email: req.body.email,
    password: req.body.password
  }, (err, response) => {
      if(err){
        res.send({
          code: 500,
          msg: "数据库错误"
        });
      }
      else{
        res.userExist = response.length;
        next();
      }
  });
});

router.post('/login/', (req, res, next) => {
  if(res.userExist === 0){
    res.send({
      code: 500,
      msg: "用户名或密码错误"
    });
  }
  else{
    res.send({
      code: 200,
      msg: "重定向至index",
      to: "index"
    });
  }
});

// 以下处理获取index页面的请求

router.get('/index/', (req, res, next) => {
  res.render('index', {
    title: 'Index',
    cssList: cssList,
  })
});

module.exports = router;