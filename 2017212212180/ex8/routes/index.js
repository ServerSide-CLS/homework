var express = require('express');
var router = express.Router();
let nodemailer = require('./nodemailer');
let code = "9999";

//随机生成验证码
function createCode() {
    let num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}
//正则
function Test(email) {
    let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return str.test(email);
}


router.get('/email',(req,res,next) => {
    let codeID = createCode()
    nodemailer.sendMailS(req,res,codeID)
})

//渲染用户注册页面
router.get('/', (req, res, next) => {
    res.render('index');
});

//用户注册
router.post('/', function (req, res) {
    console.log(req.body);
    let email = req.body.email;
    let codeid = req.body.code;
    let password = req.body.password;
    let rePassword = req.body.ConfirmPassword;
    if (email === "") {
        res.send('please fill in the email');
    }
    else if(codeid === ""){
        res.send('please fill in the code');
    }
    else if(password === ""){
        res.send('please fill in the password');
    }
    else if(rePassword === ""){
        res.send('please fill in the confirmpassword');
    }
    if(Test(email))
    {
        if (codeid === code) 
        {
            if (password === rePassword) {
                res.send('register successfully');
            } 
            else {
                res.send('password is disaccord');
            }
        } 
        else {
            res.send('identification code is not correct');
            console.log(codeid,code)
        }
    }
    else {
        res.send('please fill in the correct email');
    }
});

module.exports = router;