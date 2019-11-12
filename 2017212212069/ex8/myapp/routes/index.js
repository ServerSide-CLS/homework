var express = require('express');
var nodemailer = require("nodemailer");
var fs = require('fs');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('signUp', {layout: 'layout', title: 'signUp'});
});

router.get('/success', function (req, res) {
    res.render('success', {layout: 'layout', title: 'success'});
});

var response = {
    status: 1,
    msg: ""
};

var user = {
    email: "",
    password: ""
}

router.post('/', function (req, res) {
    console.log(req);
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(req.body.email)) {
        response.status = '2';
        response.msg = "邮箱格式错误";
        res.send(response);
        return;
    }

    if (req.body.password == "" || req.body.confirmPass == ""){
        response.status = '3';
        response.msg = "密码或确认密码为空";
        res.send(response);
        return;
    }

    if (req.body.password != req.body.confirmPass) {
        response.status = '4';
        response.msg = "确认密码不一致";
        res.send(response);
        return;
    }

    if (req.session.yanzhengma == null) {
        response.status = '5';
        response.msg = "未发送验证码";
        res.send(response);
        return;
    }

    if (req.session.yanzhengma != req.body.identify) {
        response.status = '6';
        response.msg = "验证码错误";
        res.send(response);
        return;
    }

    user.email = req.body.email;
    user.password = req.body.password;

    var flag = true;

    fs.readFile('user.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var users = JSON.parse(data.toString());
        for (var index in users){
            if (users[index].email == user.email){
                flag = false;
                return;
            }
        }
        users.push(user);
        fs.writeFile('user.json',JSON.stringify(users),function(err){
            if(err){
                console.error(err);
            }
        })
    })

    if (flag){
        response.status = '7';
        response.msg = "该邮箱已注册";
        res.send(response);
        return;
    }

    response.status = '1';
    response.msg = "注册成功";
    res.send(response);
})

var transporter = nodemailer.createTransport({//邮件传输
    host: "smtp.qq.com", //qq smtp服务器地址
    secureConnection: false, //是否使用安全连接，对https协议的
    port: 465, //qq邮件服务所占用的端口
    auth: {
        user: "1015817997@qq.com",//开启SMTP的邮箱，有用发送邮件
        pass: "cwbrmovqdwibbfhg"//授权码
    }
});

router.post("/sendMail", function (req, res) { //调用指定的邮箱给用户发送邮件

    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(req.body.email)) {
        response.status = '2';
        response.msg = "邮箱格式错误";
        res.send(response);
        return;
    }

    var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    var code = "";
    for (var i = 0; i < 6; i++) {
        var charIndex = Math.floor(Math.random() * 36);
        code += selectChar[charIndex];
    }
    var mailOption = {
        from: "1015817997@qq.com",
        to: req.body.email,//收件人
        subject: "注册验证码",
        html: "<h1>您本次的注册验证码为：" + code + "</h1>"
    };

    transporter.sendMail(mailOption, function (error, info) {
        console.log(mailOption)
        if (error) {
            response.status = '0';
            response.msg = "验证码发送失败";
            res.send(response);
            return console.info(error);
        } else {
            req.session.yanzhengma = code;
            response.status = '1';
            response.msg = "验证码发送成功";
            res.send(response);
            console.info("Message send" + code);
        }
    })

})

module.exports = router;
