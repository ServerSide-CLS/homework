var express = require('express');
var router = express.Router();
let sendmail = require('./module/nodemailer');
let tools = require('./module/tools');
const Mongo = require("./module/mongo");
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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', function (req, res) {
    console.log(req.body);
    let userInfo = req.body;
    try {
        tools.checkEmail(userInfo.email);
        tools.checkCode(userInfo.verification, code);
        tools.checkPassword(userInfo.password, userInfo.rePassword);
        Mongo.user.find({email: userInfo.email}, function (err, response) {
            if (err) {
                res.send({massage: err.toString(), status: -1});
            }
            if (response.length === 0) {
                let insertUserInfo = new Mongo.user({
                    password: userInfo.password,
                    email: userInfo.email
                });
                insertUserInfo.save(function (err, User) {
                    if (err) {
                        res.send({massage: err.toString(), status: -1});
                    }
                    res.send({massage: "注册成功", status: 200});
                })
            } else {
                res.send({massage: "用户名已存在", status: -1});
            }
        })
    } catch (e) {
        res.send({msg: e.toString(), code: -1});
    }
});

module.exports = router;
