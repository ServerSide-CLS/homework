var express = require('express');
var nodemailer = require("nodemailer");
let User = require('./tools/mongo');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('signUp', {layout: 'layout', title: 'signUp'});
});

router.get('/success', function (req, res) {
    res.render('index', {layout: 'layout', title: 'index'});
});

var apiResult = {
    status: 1,
    msg: ""
};

router.post('/', function (req, res) {
    console.log(req);
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(req.body.email)) {
        apiResult.status = '2';
        apiResult.msg = "邮箱格式错误";
        res.send(apiResult);
        return;
    }

    if (req.body.password == "" || req.body.confirmPass == ""){
        apiResult.status = '3';
        apiResult.msg = "密码或确认密码为空";
        res.send(apiResult);
        return;
    }

    if (req.body.password != req.body.confirmPass) {
        apiResult.status = '4';
        apiResult.msg = "确认密码不一致";
        res.send(apiResult);
        return;
    }

    if (req.session.yanzhengma == null) {
        apiResult.status = '5';
        apiResult.msg = "未发送验证码";
        res.send(apiResult);
        return;
    }

    if (req.session.yanzhengma != req.body.identify) {
        apiResult.status = '6';
        apiResult.msg = "验证码错误";
        res.send(apiResult);
        return;
    }

    var flag = true;

    var userInfo = req.body;

    User.find({email: userInfo.email},
    function(err, response){
        if (err){
            res.render('error', {layout: 'layout', title: 'error', message: err.toString()});
            return;
        }
        if (response.length === 0) {
            var newUser = new User({
                email: userInfo.email,
                password: userInfo.password
            });

             newUser.save(function (err, User) {
                 if (err){
                     apiResult.status = '8';
                     apiResult.msg = "注册失败";
                     res.send(response);
                     return;
                 }
                 flag = true;
             });
        }else{
            flag = false;
        }
    });

    if (!flag){
        apiResult.status = '7';
        apiResult.msg = "该邮箱已注册";
        res.send(apiResult);
        return;
    }

    apiResult.status = '1';
    apiResult.msg = "注册成功";
    res.send(apiResult);
})

var transporter = nodemailer.createTransport({//邮件传输
    host: "smtp.qq.com", //qq smtp服务器地址
    secureConnection: false, //是否使用安全连接，对https协议的
    port: 465, //qq邮件服务所占用的端口
    auth: {
        user: "1015817997@qq.com",//开启SMTP的邮箱，有用发送邮件
        pass: "ppdqkjkghldwbfhf"//授权码
    }
});

router.post("/sendMail", function (req, res) { //调用指定的邮箱给用户发送邮件

    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(req.body.email)) {
        apiResult.status = '2';
        apiResult.msg = "邮箱格式错误";
        res.send(apiResult);
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
            apiResult.status = '0';
            apiResult.msg = "验证码发送失败";
            res.send(apiResult);
            return console.info(error);
        } else {
            req.session.yanzhengma = code;
            apiResult.status = '1';
            apiResult.msg = "验证码发送成功";
            res.send(apiResult);
            console.info("Message send" + code);
        }
    })

})

module.exports = router;
