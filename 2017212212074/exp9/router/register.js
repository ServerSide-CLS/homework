const express = require(`express`)
const router = express.Router()

var { isEmail } = require('../until/until.js')
//数据库操作异步方法
var { userfind, userinsert } = require("../until/user")
var { designerfind } = require("../until/designer")

//注册
router.post('/register', async function (req, res) {
    let { email, code, password, password2 } = req.body;
    //检测邮箱是否已经存在在user.json
    let userData = await userfind({ email: email });
    if (userData.length > 0) {
      res.send({ code: 30000, message: "邮箱已存在" })
      return;
    }
    // 检测邮箱格式
    if (!isEmail(email)) {
      res.send({ code: 30000, message: "邮箱格式错误" })
      return;
    }
    // 检测两次密码输入是否一致
    if (password != password2) {
      res.send({ code: 30000, message: "两次密码输入不一致" })
      return;
    }
    //检测是否获取过验证码
    let designData = await designerfind(email);
    if(designData.length<1){
      res.send({ code: 30000, message: "未获取过验证码" })
      return ;
    }
    // 从design表中提取出验证码和获取时间
    let codeHere = designData[0].code
    let last = designData[0].lasttime
    let now = (new Date()).valueOf()
    //输入的验证码和json中的验证码是否一样。若一样则注册成功,将邮箱和密码加入东user.json中
    if (codeHere == code) {
      //如果验证码超过三分钟，过期
      if (now - parseInt(last) >= 180000) {
        res.send({ code: 30000, message: "验证码已过期，请重新获取" })
      }
      else {//未过期，注册成功
        await userinsert(email, password)
        res.send({ code: 20000, message: "注册成功! 3秒后将跳转到login页面" })
      }
    }
    else {
      res.send({ code: 30000, message: "验证码错误" })
    }
  });

  module.exports = router;