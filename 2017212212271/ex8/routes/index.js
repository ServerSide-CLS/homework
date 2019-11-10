var express = require('express');
var router = express.Router();
let sendmail = require('./nodemailer');
let code = "000000";

function createSixCode() {
    let num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

//获取邮箱验证码
router.get('/email',(req,res,next) => {
    let codeID = createSixCode()
    nodemailer.sendMailS(req,res,codeID)
})

function Test(email) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(email);
}

//用户注册页面渲染
router.get('/', (req, res, next) => {
    res.render('index');
});

//用户逻辑注册
router.post('/', function (req, res) {
    console.log(req.body);
    let email = req.body.email;
    let codeid = req.body.code;
    let password = req.body.password;
    let rePassword = req.body.ConfirmPassword;
    if (email === "") {
        res.send('you have not fill in the email');
    }else if(codeid === ""){
        res.send('you have not fill in the code');
    }else if(password === ""){
        res.send('you have not fill in the password');
    }else if(rePassword === ""){
        res.send('you have not fill in the confirmpassword');
    }
    if(Test(email))
    {
       if (codeid === code) {
        if (password === rePassword) {
            res.send('register successfully');
        } else {
            res.send('password is disaccord');
        }
    } else {
        res.send('identification code is not correct');
        console.log(codeid,code)
    }
    else {
       res.send('please fill in the correct email');
   }
}
});

module.exports = router;