var express = require('express');
var router = express.Router();
let nodemailer = require('./module/nodemailer');
let tools = require('./module/tools');
const Mongo = require("./module/mongo");
var check = require('./check');
var code = "000000";

function createCode() {
    let num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register');
});

//发送邮件
router.get('/email', function (req, res, next) {
    code = createCode();
    console.log("验证码" + code);
    nodemailer.sendMailFn(req, res, code);
});

//获取表单项
router.post('/', function (req, res) {
    console.log(req.body);
    let userInfo = req.body;
    let email = req.body.email;
    let verification = req.body.verification;
    let password = req.body.password;
    let rePassword = req.body.rePassword;
    if (email == "") {
        res.send("请填写邮箱");
    } else if (verification == "") {
        res.send("请填写验证码");
    } else if (password == "") {
        res.send("请填写密码");
    } else if (rePassword == "") {
        res.send("请重复密码");
    } else {
        if (reg.test(email)) {
            if (verification == code) {
                if (password == rePassword) {
                    //查询email是否存在
                    Mongo.findOne({
                        'email': email
                    }, function (err, user) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            if (user == null) {
                                var newUser = new Mongo({
                                    email: email,
                                    password: password
                                });
                                newUser.save(function (err, Mongo) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    } else {
                                        console.log("email不存在,可注册");
                                    }
                                });
                                res.send("注册成功!");
                                res.render("login", {
                                    message: "注册成功"
                                });
                            } else {
                                if (user.password == '') {
                                    user.code = code;
                                    user.save(function (err, updatedUser) {
                                        if (err) {
                                            console.log(err);
                                            return;
                                        }
                                    });
                                } else {
                                    console.log("email已存在，不允许注册");
                                    res.render("login", {
                                        message: "email已存在"
                                    });
                                }
                            }
                        }
                    });
                }else {
                    res.send("密码不相同！");
                }
            } else {
                res.send("验证码错误!");
            }
        } else {
            res.send("邮箱错误!");
        }
    }
});
module.exports = router;