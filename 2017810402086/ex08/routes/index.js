var express = require('express');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer  = require('nodemailer');
var svgCaptcha = require('svg-captcha');
var multer = require('multer');

var router = express.Router();
var mailTransport = nodemailer.createTransport({
  host : 'smtp.qq.com',
  secureConnection: true,
  auth : {
      user : '1029706584@qq.com',
      pass : 'wefscmixduzfbded'
  },
});
var captchaSetting = {
  inverse: false,
  ignoreChars: '0o1ilI',
  fontSize: 64,
  noise: 5,
  color:true,
  width:320,
  height:120,
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
  fs.readFile(fileDir, 'utf-8', (err, data) => {
    if(err){
      console.log(err);
      res.send({
        code: 500,
        msg: "服务器文件错误"
      });
    }
    else{
      console.log(data);
      res.fileData = JSON.parse(data);
      next();
    }
  });
});

router.post('/captcha/', (req, res, next) => {
  res.fileData.forEach(val => {
    if(val.email === req.body.email){
      res.send({
        code: 500,
        msg: "该邮箱已被注册"
      }).end();
    }
  });
  next();
});

router.post('/captcha/', (req, res, next) => {
  res.captcha = svgCaptcha.create(captchaSetting);
  next();
});

router.post('/captcha/', (req, res, next) => {
  res.emailOption = {
    from    : '<1029706584@qq.com>',
    to      : `<${req.body.email}>`,
    subject : '验证码',
    text    : '验证码',
    html    : `<h2>这是你的验证码</h2><p>${res.captcha.data}</p>`,
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
  res.render('index', {
    title: '用户注册',
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
  fs.readFile(fileDir, 'utf-8', (err, data) => {
    if(err){
      console.log(err);
      res.send({
        code: 500,
        msg: "服务器文件错误"
      });
    }
    else{
      console.log(data);
      res.fileData = JSON.parse(data);
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  res.fileData.forEach(val => {
    if(val.email === req.body.email){
      res.send({
        code: 500,
        msg: "该邮箱已被注册"
      }).end();
    }
  });
  next();
});

router.post('/', (req, res, next) => {
  res.fileData.push({
    email: req.body.email,
    password: req.body.password
  });
  next();
});

router.post('/', (req, res, next) => {
  // 并发的状态下直接覆盖写入文件肯定会出问题...
  fs.writeFileSync('resourse/user.json', JSON.stringify(res.fileData));
  next();
});

router.post('/', (req, res, next) => {
  res.send({
    code: 200,
    msg: "注册成功"
  });
});

// 以下处理获取json文件的请求

router.get('/check/', (req, res, next) => {
  fs.readFile(fileDir, 'utf-8', (err, data) => {
    if(err){
      console.log(err);
      res.send({
        code: 500,
        msg: "服务器文件错误"
      });
    }
    else{
      console.log(data);
      res.send(data);
    }
  });
});

module.exports = router;
