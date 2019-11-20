var express = require('express');
var router = express.Router();
let sendmail = require('./module/nodemailer');
let functions = require('./module/function');
const Mongo = require("./module/mongo");
let code = "000000";

function createCode() {
    let num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

//send email
router.get('/email', function (req, res, next) {
    code = createCode();
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
        functions.checkEmail(userInfo.email);
        functions.checkCode(userInfo.code, code);
        functions.checkPassword(userInfo.password, userInfo.rePassword);

// userInfo.email"1049668876@qq.com"
        Mongo.user.find({email:userInfo.email }, function (err, data) {
            if (err) {
                res.send({massage: err.toString(), status: -1});
            }
            if (!data.length) {
                let insertData = new Mongo.user({
                    password: userInfo.password,
                    email: userInfo.email
                });
                insertData.save(function (err, User) {
                    if (err) {
                        res.send({massage: err.toString(), status: -1});
                    }
                    res.send({massage: "注册成功", status: 200});
                })
            } else {
                res.send({massage: "该用户已存在", status: -1});
            }
        })
    } catch (e) {
        res.send({msg: e.toString(), code: -1});
    }
});

module.exports = router;