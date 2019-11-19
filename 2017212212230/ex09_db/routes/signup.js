const express = require('express');
const router = express.Router();

/* GET signup page. */
router.get('/', (req, res) => {
  res.render('signup', {
    title: 'Sign up',
  });
});


// 处理表单请求
router.post('/', (req, res) => {
  console.log(req.body)
  let { email, pwd, rpwd } = req.body

  const reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/;
  // if (!reg.test(email)) return res.render('signup', {
  //   title: 'Sign up',
  //   message: '邮箱格式有误！',
  // });
  // if (!/^\w{6,15}$/.test(pwd)) return res.render('signup', {
  //   title: 'Sign up',
  //   message: '密码格式有误！',
  // });
  // if (pwd !== rpwd) return res.render('signup', {
  //   title: 'Sign up',
  //   message: '密码格式有误！',
  // });

  // 查重、添加用户
  const User = require('mongoose').model('User');
  User.findOne({ email: email }, function (err, doc) {
    console.log(doc)
    if (err) return console.log(err)
    if (!doc) {
      let newUser = new User({
        email: email,
        pwd: pwd,
      });
      newUser.save((err, newUser) => {
        if (err) console.log(err)
        res.render('signin', {
          title: 'Sign in',
          message: '注册成功，请登录',
        });
      });
    } else {
      res.render('signup', {
        title: 'Sign up',
        message: '该邮箱已注册',
      })
    }
  });
})

module.exports = router;
