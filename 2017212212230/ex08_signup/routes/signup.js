const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const fs = require('fs');
const utils = require('../utils/utils');
const {
  randomVerifyCode,
  renderParams,
} = utils

// 定义邮件服务器
const transporter = nodemailer.createTransport({
  service: 'smtp.qq.com',
  service: 'qq',
  port: 465,
  secureConnection: true, // true for 465, false for other ports
  auth: {
    user: 'yuch256@qq.com',   // generated ethereal user
    pass: 'bsbbidyfrwjwddee', // generated ethereal password
  }
});

/* GET signup page. */
router.get('/', (req, res, next) => {
  let verifying = req.session.verifying ? true : false
  const verifyTime = verifying ? req.session.verifyTime : 0
  res.render('signup', renderParams({
    title: 'Express-Signup',
    verifying: verifying,
    verifyTime: verifyTime,
  }))
});
// 处理验证码请求
router.post('/verify', async (req, res, next) => {
  if (req.session.verifying) {
    res.send({ message: '请求过于频繁！', status: 'warn' })
  } else {
    req.session.verifying = true
    req.session.save()
    const email = req.body.email
    if (!/[-.\w]+@([\w-]+\.)+[\w-]{2,20}/.test(email)) {
      req.session.destroy()
      res.send({ message: '邮箱格式有误！', status: 'error' })
    }
    const verifyCode = randomVerifyCode()
    // 邮箱格式错误也会执行到这里。。。
    // 邮件发送
    await transporter.sendMail({
      from: '"localhost 👻" <yuch256@qq.com>', // sender address
      to: email, // list of receivers
      subject: 'Sign up Verification code', // Subject line
      text: verifyCode, // plain text body
      // html: fs.createReadStream('./public/html/123.html') // html body
    }, (error, info) => {
      console.log(email)
      // 因为异步有延迟，更新maxAge
      req.session.touch()
      verifyTimer()
      if (error) {
        console.log(`\x1B[31m${error}`)
        res.send({ message: '验证码发送失败！', status: 'error' })
      }
      // 发送成功
      req.session.vcode = verifyCode
      res.status(200).send({ message: '验证码发送成功！', status: 'success' })
      console.log(`\x1B[32mE-mail message: ${info.response}`)
    });
  }
  // 计时器
  function verifyTimer(timer = 60) {
    req.session.verifyTime = --timer
    req.session.save()
    if (timer > 0) { setTimeout(() => verifyTimer(timer), 1000) }
  }
})
// 处理表单请求
router.post('/home', (req, res, next) => {
  console.log(req.body)
  let { email, vcode, pwd, rpwd } = req.body
  // 验证表单信息
  const reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/
  if (!reg.test(email)) return res.render('signup', renderParams({
    msg: { message: '邮箱格式有误！', status: 'error' }
  }))
  if (vcode !== req.session.vcode) return res.render('signup', renderParams({
    msg: { message: '验证码有误！', status: 'error' }
  }))
  if (!/^\w{6,15}$/.test(pwd)) return res.render('signup', renderParams({
    msg: { message: '密码格式有误！', status: 'error' }
  }))
  if (pwd !== rpwd) return res.render('signup', renderParams({
    msg: { message: '密码不一致！', status: 'error' }
  }))

  // 写入用户信息
  const userInfo = {
    "password": pwd,
    "signupTime": new Date(),
  }

  fs.readFile('./user.json', 'utf8', (err, data) => {
    if (err) return res.render('signup', renderParams({
      msg: { message: '读取错误', status: 'error' }
    }))
    data = JSON.parse(data)
    // 用户查重
    if (data[email]) return res.render('signup', renderParams({
      msg: { message: '该邮箱已被注册！', status: 'warn' }
    }))
    data[email] = userInfo
    data = JSON.stringify(data, null, 2)

    fs.writeFile('./user.json', data, 'utf8', err => {
      if (err) return res.render('signup', renderParams({
        msg: { message: '用户信息写入错误', status: 'error' }
      }))
      // return res.render('home', renderParams({
      //   msg: { message: '恭喜，注册成功！', status: 'success' }
      // }))
      return res.redirect('home')
    })
  });

})

module.exports = router;
