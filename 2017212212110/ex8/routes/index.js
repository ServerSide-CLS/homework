var express = require('express');
var router = express.Router();
var Mail = require("../js/mail");
var registerck = require("../js/submit");

router.get('/', function(req, res) {
  res.render('index', { layout: 'default' });
});

router.get("/getcode/:email", (req, res) => {
    let email = req.params.email;
    try {
        let Vcode = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);//随机数生成
        Mail.send(email, Vcode, (state) => {
            if (state == 1) {
                process.env[email] = Vcode;
                res.send({ msg: "邮件发送成功", code: Vcode });
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
        if(userInfo.code==""){
            throw new Error("验证码不能为空");
        }
        if (process.env[userInfo.email] != userInfo.code) {
            throw new Error("验证码错误");
        }
        registerck.register(userInfo.email,userInfo.password)
        res.send({ msg: "用户添加成功", code: 200 });
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
})

module.exports = router;
