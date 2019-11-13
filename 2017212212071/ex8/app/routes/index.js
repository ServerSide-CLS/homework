var express = require('express');
var sendmail = require('./nodemailer');
var router = express.Router();

var verifycode = "000000";
var num = "000000";

function createVerityCode(){
    num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}
function checkEmailAddress(email) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(email);
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/email', function (req, res, next) {
    verifycode = createVerityCode();
    sendmail.sendMailFn(req, res, verifycode);
});

router.post('/', function (req, res) {
    console.log(req.body);
    let email = req.body.email;
    let verification = req.body.verification;
    let password = req.body.password;
    let repeatPwd = req.body.repeatPwd;
    if (email === "") {
        res.send("<h1>Empty Email Address</h1>");
    } else if (verification === "") {
        res.send("<h1>Empty Verification Code</h1>");
    } else if (password === "") {
        res.send("<h1>Empty Password</h1>");
    } else if (repeatPwd === "") {
        res.send("<h1>Please repeat your password</h1>");
    } else {
        if (checkEmailAddress(email)) {
            if (verification === verifycode) {
                if (password === repeatPwd) {
                    res.send("<h1>Register Succeed!</h1>");
                } else {
                    res.send("<h1>Different Password</h1>");
                }
            } else {
                res.send("<h1>Wrong Verification Code</h1>");
            }
        } else {
            res.send("<h1>Wrong Email Address</h1>");
        }
    }
});

module.exports = router;
