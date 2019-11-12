var express = require('express');
var router = express.Router();
let sendmail = require('./nodemailer');
var fs = require("fs");
let code = "000000";

function createSixCode() {
    let num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

//发送邮件
router.get('/email', function (req, res, next) {
    code = createSixCode();
    console.log(code);
    sendmail.sendMailFn(req, res, code);
});

function emailTest(email) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(email);
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/', function (req, res) {
    console.log(req.body);
    let email = req.body.email;
    let verification = req.body.verification;
    let password = req.body.password;
    let rePassword = req.body.rePassword;
    if (email === "") {
        res.send("请填写邮箱");
    } else if (verification === "") {
        res.send("请填写邮箱");
    } else if (password === "") {
        res.send("请填写密码");
    } else if (rePassword === "") {
        res.send("请填写重复密码");
    } else {
        if (emailTest(email)) {
            if (verification === code) {
                if (password === rePassword) {
                    var data = "{\n" +
                        "  \"email\": \"" + email + "\",\n" +
                        "  \"password\": \"" + password + "\"\n" +
                        "}";
                    // let writerStream = fs.createWriteStream('user.json');
                    // writerStream.write(data, 'UTF8');
                    // writerStream.end();
                    // writerStream.on('finish', function () {
                    //     console.log("写入完成。");
                    // });
                    fs.appendFile("user.json", data, (error) => {
                        if (error) return console.log("追加文件失败" + error.message);
                        console.log("追加成功");
                    });
                    res.send("注册成功!");
                } else {
                    res.send("两次密码输入不正确!");
                }
            } else {
                res.send("请输入正确验证码!");
            }
        } else {
            res.send("请填写正确邮箱!");
        }
    }
});

module.exports = router;
