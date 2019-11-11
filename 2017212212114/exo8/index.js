var express = require('express');
var router = express.Router();
var app = express();
const Handlebars = require('handlebars')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
var nodemailer = require('nodemailer');



// 用户注册页面渲染
app.get('/signup', function(req, res) {
    res.render('signup');
});

// 用户注册逻辑
app.post('/signup', function(req, res) {
    if (Users.length > 0) {
        Users.filter((user) => {
            if (user.id === req.body.id) {
                res.render('signup', { message: "User Already Exists!" });
            } else {
                var newUser = { id: req.body.id, password: req.body.password };
                Users.push(newUser);
                req.session.user = newUser;
                res.redirect('protected');
            }
        })
    } else {
        var newUser = { id: req.body.id, password: req.body.password };
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('protected');
    }
});


app.post('/verificationCode', function(req, res) {
    if (res.query.email.match('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/g')) {
        sendCode(res.query.email);
    } else {
        res.render('index', {
            msg: '邮箱格式不对',
        });
    }
});


//发送验证码
function sendCode(user) {
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '413469406@qq.com',
            pass: 'tuqpdagnrvkdbgfi' //授权码,通过QQ获取

        }
    });
    var code = "";
    while (code.length < 5) {
        code += Math.floor(Math.random() * 10);
    }
    var mailOptions = {
        from: '413469406@qq.com', // 发送者
        to: '2597795315@qq.com', // 接受者,可以同时发送多个,以逗号隔开
        subject: '发送验证码', // 标题
        //text: 'Hello world', // 文本
        html: "<h1>欢迎注册，您本次的注册验证码为：" + code + "</h1>"
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            return;
        }
    });

}

// app.post('/register', function(req, res) {
//     if (res.query.pwd == res.query.check_pwd) {

//     }

// });