const express = require(`express`)
const router = express.Router()

//数据库操作异步方法
var { userfind } = require("../until/user")

//登录
router.post('/login', async function (req, res) {
    let { email, password } = req.body;
    let userData = await userfind({ email: email });
    if (userData.length < 1) {
        //用户不存在
        res.send({ code: 30000, message: "用户不存在" })
    } else {
        if (password == userData[0].password) {
            //密码正确
            res.send({ code: 20000, message: "登录成功! 3秒后将跳转到index页面" })
        }
        else {
            //密码错误
            res.send({ code: 30000, message: "密码错误" })
        }
    }
})

module.exports = router;