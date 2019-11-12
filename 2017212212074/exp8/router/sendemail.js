const express = require(`express`)
const router = express.Router()

// 异步读取写入文件数据
var { getData, writeData } = require('../until/data');

//随机数生成
var { captchaNumber } = require('../until/until.js')

//邮件发送方法
var sendMail = require('../until/email');

//发送邮箱验证码
router.post('/sendemail', async function (req, res) {
    let email = req.body.email;
    //获取用户数据
    let userData = await getData('./data/user.json');
    let flag = false;
    for (let i = 0; i < userData.user.length; i++) {
      if (userData.user[i].email == email) {
        flag = true
        break
      }
    }
    //邮箱已存在
    if (flag) {
      res.send({ code: 3000, message: "邮箱已存在" })
      return;
    }
    else {//邮箱不存在
      let designData = await getData('./data/design.json');
      //是否曾经验证过
      let flag2 = -1;
      for (let i = 0; i < designData.design.length; i++) {
        if (designData.design[i].email == email) {
          flag2 = i
          break
        }
      }
      //曾经验证过，那么根据时间戳判断有没有过期，过期进行删除覆盖，没过期三分钟防刷
      if (flag2 != -1) {
        let now = (new Date()).valueOf()
        if (now - parseInt(designData.design[flag2].lasttime) >= 180000) {
          //过期，去除过期信息
          designData.design.splice(flag2, 1)
        }
        else {
          res.send({ code: 3000, message: "请再三分钟后再次尝试" })
          return;
        }
      }
      //在design表中写入注册信息
      let code = captchaNumber()
      let obj = { email: email, lasttime: (new Date()).valueOf() + "", code: code }
      designData.design.push(obj)
      writeData('./data/design.json', designData)
      //发送邮件
      let result = await sendMail(email, code).catch(e=>{
        res.send(e);
        return ;
      });
      res.send(result);
    }
  });

module.exports = router;