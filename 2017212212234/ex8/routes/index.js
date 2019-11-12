var express = require('express');
var router = express.Router();
var fs=require('fs');
let nodemailer = require('./nodemailer');
var code = "";

//随机生成验证码
function createCode() {
    let num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    // console.log(num);
    return num;
}


//正则
function Test(email) {
    let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return str.test(email);
}


router.get('/email',(req,res,next) => {
    code = createCode()
    nodemailer.sendMailS(req,res,code)
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


    if (email == "") {
        res.send('请输入邮箱');
    }
    else if(codeid == ""){
        res.send('请输入验证码');
    }
    else if(password == ""){
        res.send('请输入密码');
    }
    else if(rePassword == ""){
        res.send('请再次输入密码');
    }
    if(Test(email))
    {
        if (codeid == code) 
        {
            if (password == rePassword) {
                res.send('注册成功！');
                
                //写入user.json
                fs.readFile('user.json','utf8',function (err, data){
                    if(err)
                        console.log(err)
                    var newUser={'emailbox':email,"password":password}
                    var users=JSON.parse(data)
                    users.data.push(newUser)
                    var usersStr=JSON.stringify(users,"","\t")
                    fs.writeFileSync('user.json',usersStr)
                })

            } 
            else {
                res.send('密码错误！');
            }
        } 
        else {
            res.send('验证码错误!');
        }
    }
    else {
        res.send('请输入正确邮箱!');
    }
});

module.exports = router;