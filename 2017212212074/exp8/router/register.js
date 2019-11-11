const express = require(`express`)
const router = express.Router()

var { isEmail } = require('../until/until.js')

// 异步读取写入文件数据
var { getData, writeData } = require('../until/data');

//注册
router.post('/register', async function (req, res) {
  let { email, code, password, password2 } = req.body;
  //检测邮箱是否已经存在再user.json
  let userData = await getData('./data/user.json');
  let flag = false;
  for (let i = 0; i < userData.user.length; i++) {
    if (userData.user[i].email == email) {
      flag = true
      break
    }
  }
  if (flag) {
    res.send({ code: 3000, message: "邮箱已存在" })
    return;
  }
  // 检测邮箱格式
  if (!isEmail(email)) {
    res.send({ code: 3000, message: "邮箱格式错误" })
    return;
  }
  // 检测两次密码输入是否一致
  if (password != password2) {
    res.send({ code: 3000, message: "两次密码输入不一致" })
    return;
  }
  // 从design表中提取出验证码
  let designData = await getData('./data/design.json');
  let codeHere = ""
  let last = "";
  for (let i = 0; i < designData.design.length; i++) {
    if (designData.design[i].email == email) {
      codeHere = designData.design[i].code
      last = designData.design[i].lasttime
      break
    }
  }
  let now = (new Date()).valueOf()
  //输入的验证码和json中的验证码是否一样。若一样则注册成功,将邮箱和密码加入东user.json中
  if (codeHere == code) {
    //如果验证码超过三分钟，过期
    if (now - parseInt(last) >= 180000) {
      res.send({ code: 2000, message: "验证码已过期，请重新获取" })
    }
    else {//未过期，注册成功
      userData.user.push({ email: email, password: password })
      writeData('./data/user.json', userData)
      res.send({ code: 2000, message: "注册成功" })
    }
  }
  else {
    res.send({ code: 3000, message: "验证码错误" })
  }
});

  module.exports = router;