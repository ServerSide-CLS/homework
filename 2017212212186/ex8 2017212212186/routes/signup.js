var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var url = require('url');

// var upload = multer({ dest: './public/uploads/' })

// 定义邮件服务器
const transporter = nodemailer.createTransport({
  service: 'smtp.qq.com',
  service: 'qq',
  port: 465,
  secureConnection: true, // true for 465, false for other ports
  auth: {
    user: '632781087@qq.com', // generated ethereal user
    pass: 'ztezmafivtdpbbii', // generated ethereal password
  }
});

// res.render参数
function renderParams() {
  let defaultSetting = {
    title: '注册',
    verifying: false,
    verifyTime: 0,
    msg: null,
  }
  try {
    for (let [k, v] of Object.entries(arguments[0])) {
      if (k === 'msg') v.color = v.status === 'error' ? 'red' : v.status === 'warn' ? '#ef8f00' : '#68af02';
      defaultSetting[k] = v
    }
    // console.log(defaultSetting)
    return defaultSetting
  } catch {
    return {}
  }
}
/* GET signup page. */
router.get('/', (req, res, next) => {
  let verifying = req.session.verifying ? true : false
  const verifyTime = verifying ? req.session.verifyTime : 0
  res.render('signup', renderParams({
    title: '注册',
    verifying: verifying,
    verifyTime: verifyTime,
  }))
});

router.post('/protected', async (req, res, next) => {
  if (req.session.verifying) {
    res.send({
      message: '请求过于频繁！',
      status: 'warn'
    })
  } else {
    req.session.verifying = true
    req.session.save()
    const email = req.body.email
    if (!/[-.\w]+@([\w-]+\.)+[\w-]{2,20}/.test(email)) {
      req.session.destroy()
      res.send({
        message: '邮箱格式有误！',
        status: 'error'
      })
    }
    const verifyCode = randomVC()
    await transporter.sendMail({
      from: '"localhost"<632781087@qq.com>',
      to: email,
      subject: '这是你的验证码',
      text: verifyCode,
    }, (error, info) => {
      req.session.touch()
      verifyTimer()
      if (error) {
        console.log(`\x1B[31m${error}`)
        res.send({
          message: '验证码发送失败！',
          status: 'error'
        })
      }
      // 发送成功
      req.session.vcode = verifyCode
      res.status(200).send({
        message: '验证码发送成功！',
        status: 'success'
      })
      console.log(`\x1B[32mE-mail message: ${info.response}`)
    });
  }

  function verifyTimer(timer = 300) {
    req.session.verifyTime = --timer
    req.session.save()
    if (timer > 0) {
      setTimeout(() => verifyTimer(timer), 1000)
    }
  }
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  let {
    email,
    vcode,
    pwd
  } = req.body
  // 验证表单信息
  const reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/
  if (!reg.test(email)) return res.render('signup', renderParams({
    msg: {
      message: '邮箱格式错误！',
      status: 'error'
    }
  }))
  else if (vcode !== req.body.vcode) return res.render('signup', renderParams({
    msg: {
      message: '验证码错误！',
      status: 'error'
    }
  }))
  else if (!/\w{6,15}/.test(req.body.pwd)) return res.render('signup', renderParams({
    msg: {
      message: '密码格式错误！',
      status: 'error'
    }
  }))
  else if (pwd !== req.body.checkPwd) return res.render('signup', renderParams({
    msg: {
      message: '密码不一致！',
      status: 'error'
    }
  }))
  else {
    let saveData={
      email: req.body.email,
      pwd: req.body.pwd,
    }
    var str = JSON.stringify(saveData, "", "\t");
    fs.writeFile('user.json', str, function (err) {
      if (err) {
        res.status(500).send('Server is error...')
      }
    })
    return res.send("注册成功");
  }
})
// 验证码生成
function randomVC() {
  let verifyCode = ''
  for (let i = 0; i < 6; i++) {
   var radom = Math.floor(Math.random()*10);
   verifyCode += radom;
  }
  return verifyCode
}

module.exports = router;