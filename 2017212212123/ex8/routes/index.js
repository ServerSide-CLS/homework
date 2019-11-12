var express = require('express');
var nodemailer = require('./main');
var router = express.Router();
var fs = require('fs');
var code = "";

function createCode() {
    let num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

router.get('/email', (req, res, next) => {
    code = createCode()
    nodemailer.sendMailS(req, res, code)
})

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', function (req, res) {
    let email = req.body.email;
    let codeid = req.body.code;
    let pwd = req.body.password;
    let cpwd = req.body.ConfirmPassword;

    if (email == "") {
        res.send('请输入邮箱');
    }
    else if(codeid == "") {
        res.send('请输入验证码');
    }
    else if(pwd == "") {
        res.send('请输入密码');
    }
    else if(cpwd == "") {
        res.send('请再次输入密码');
    }
    if(str.test(email)) {
        if (codeid == code) {
            if (pwd == cpwd) {
                res.send('注册成功！');
                
                fs.readFile('user.json', 'utf8', function (err, data) {
                    if (err)
                        console.log(err)
                    var newUser = {"email": email, "password": pwd}
                    var users = JSON.parse(data)
                    users.data.push(newUser)
                    var usersStr=JSON.stringify(users, "", "\t")
                    fs.writeFileSync('user.json', usersStr)
                })

            } 
            else {
                res.send('密码不一致！');
            }
        } 
        else {
            res.send('验证码错误!');
        }
    }
    else {
        res.send('邮箱格式不正确!');
    }
});

module.exports = router;