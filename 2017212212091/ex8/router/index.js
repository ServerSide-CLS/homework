var express = require("express");
var Mail = require("../src/mail");
var registerck = require("../src/register");
var router = express.Router();

router.get("/", (req, res) => {
    res.render('index', { layout: 'default' })
})

router.get("/getCAPTCHA/:email", (req, res) => {
    let email = req.params.email;
    try {
        let code = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);//随机数生成
        Mail.send(email, code, (state) => {
            console.log(state);//debug
            if (state == 1) {
                process.env[email] = code;
                res.send({ msg: "邮件发送成功", code: code });
            } else {
                throw new Error("邮件发送失败");
            }
        })
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
})

router.post("/register", (req, res) => {
    // process.env['test3@qq.com'] = 'test';
    // process.env['test@qq.com'] = 'test';
    let userInfo = req.body;
    try {
        if(userInfo.email==""){
            throw new Error("邮箱不能为空");
        }
        if(userInfo.CAPTCHA==""){
            throw new Error("验证码不能为空");
        }
        if (process.env[userInfo.email] != userInfo.CAPTCHA) {
            throw new Error("验证码错误");
        }
        registerck.register(userInfo.email,userInfo.password)
        res.send({ msg: "用户添加成功", code: 200 });
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
})

module.exports = router;