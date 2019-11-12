var express = require('express');
var app = express();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
var nodemailer = require('nodemailer');

var router = express.Router();
var mailTransport = nodemailer.createTransport({
  host : 'smtp.qq.com',
  secureConnection: true,
  auth : {
    user: '1114187959@qq.com',
    pass: 'yyy3171969'
  },
});

app.post('/verificationCode', function(req, res) {
  if (res.query.email.match('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/g')) {
      sendCode(res.query.email);
  } else {
      res.render('index', {
          msg: '邮箱格式不对',
      });
  }
});

router.post('/captcha/', (req, res, next) => {
  res.captcha = svgCaptcha.create(captchaSetting);
  next();
});

router.post('/captcha/', (req, res, next) => {
  res.emailOption = {
    from    : '<2557584102@qq.com>',
    to      : `<${req.body.email}>`,
    subject : '验证码',
    text    : '验证码',
    html    : `<h2>这是你的验证码</h2><p>${res.captcha.data}</p>`,
  };
  next();
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

router.get('/', (req, res, next) => {
  res.render('index', {
    title: '用户注册',
    cssList: cssList,
  });
});

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
  res.fileData.push({
    email: req.body.email,
    password: req.body.password
  });
  next();
});

router.post('/', (req, res, next) => {
  res.send({
    code: 200,
    msg: "注册成功"
  });
});

module.exports = router;