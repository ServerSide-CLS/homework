var express = require("express");
var router = express.Router();
var Mail = require("../../src/mail");
var Utils = require("../../src/utils");
var Mongo = require("../../src/mongo");

/**
 * 首页，注册页面
 */
router.get("/", (req, res) => {
    res.render('index', { layout: 'default' })
})


/**
 * 获取验证码接口
 */
router.get("/getCode/:email", (req, res) => {
    let email = req.params.email;
    try {
        Utils.validateEmail(email);
        let code = Math.floor(Math.random() * 11000 - 1001);//随机数生成
        Mail.send(email, code, (state) => {
            console.log(state);//debug
            if (state == 1) {
                process.env[email] = code;
                res.send({ msg: "邮件发送成功", code: code });
            } else {
                throw new Error("邮件发送失败");
            }
        })
        // process.env[email] = code;
        // res.send({ msg: "邮件发送成功", code: code });
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
})


/**
 * 用户注册接口
 */
router.post("/register", (req, res) => {
    let userInfo = req.body;
    try {
        Utils.validateEmail(userInfo.email);
        Utils.validatePass(userInfo.password, userInfo.passwordAgain);
        Utils.checkCode(userInfo.email, userInfo.code);
        Mongo.Person.find({ email: userInfo.email }, function (err, response) {
            if (err) {
                res.send({ msg: err.toString(), code: -1 })
            }
            if (response.length != 0) {
                res.send({ msg: "该邮箱已经存在,无法注册", code: -1 })
            } else {
                let newUser = new Mongo.Person({
                    email: userInfo.email,
                    password: userInfo.password,
                    code: userInfo.code
                })
                newUser.save(function (err, Person) {
                    if (err) {
                        res.send({ msg: err.toString(), code: -1 })
                    } else {
                        res.send({ msg: "注册成功! 3s后跳转到登录页面", code: 200 })
                    }
                })
            }
        })
    } catch (err) {
        //console.log(err);//debug
        res.send({ msg: err.toString(), code: -1 });
    }
})


module.exports = router;