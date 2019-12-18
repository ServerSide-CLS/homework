var express = require("express");
var Mail = require("../src/mail");
var registerck = require("../src/register");
var router = express.Router();
//产生随机验证码
let key = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);//随机数生成

router.get("/", (req, res) => {
    res.render('index', { layout: 'default' })
})

router.get("/getCAPTCHA/:email", (req, res) => {
    let email = req.params.email;
    try {
        Mail.send(email, key, (state) => {
            if (state == 1) {
                process.env[email] = key;
                res.send({ msg: "邮件发送成功", code: key });
            } else {
                throw new Error("邮件发送失败");
            }
        })
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
})

router.post("/register", (req, res) => {
    let userInfo = req.body;
    try {
        if(userInfo.email==""){
            throw new Error("邮箱不能为空");
        }
        if (key != userInfo.CAPTCHA) {
            throw new Error("验证码有误");
        }
        registerck.register(userInfo.email,userInfo.password)
        res.send({ msg: "用户添加成功", code: 200 });
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
})

module.exports = router;