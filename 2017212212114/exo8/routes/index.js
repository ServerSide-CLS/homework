var express = require('express');
var router = express.Router();
var app = express();
const Handlebars = require('handlebars')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
var nodemailer = require('nodemailer');
var fs = require('fs');
let cookieParser = require("cookie-parser")
var bodyParser = require('body-parser');
var session = require('express-session');

var codeMap = new Map();



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));app.set('trust proxy', 1) // trust first proxy

/* GET signup page. */
app.get('/signup', function(req, res, next) {
    res.render('signup', {});
});

/* GET protected page. */
app.get('/protected', function(req, res, next) {
    res.render('protected', {});
});

//错误处理
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


function setCode() {
    var code = "";
    while (code.length < 5) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

//发送验证码
function sendCode(user, code) {
    console.log(user, code);
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '413469406@qq.com',
            pass: 'gkgcapcopbajcbcg' //授权码,通过QQ获取

        }
    });
    var mailOptions = {
        from: '413469406@qq.com', // 发送者
        to: user, // 接受者,可以同时发送多个,以逗号隔开
        subject: '发送验证码', // 标题
        html: "<h1>欢迎注册，您本次的注册验证码为：" + code + "</h1>"
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            throw console.error(err);
        }
    });
}

//处理发送验证码
app.post('/sendCode', function(req, res) {
    //sendCode('413469406@qq.com');
    fs.readFile('public/json/User.json', function(err, data) {
        if (err) {
            console.error(err);
            throw err;
        }
        var User = data.toString(); //将二进制的数据转换为字符串
        if (User !== "") {
            User = JSON.parse(User); //将字符串转换为json对象
            let flag = 0;
            for (var i = 0; i < User.length; i++) {
                if (req.body.email == User[i].id) {
                    console.log(User[i].id);
                    flag = 1;
                }
            }
            if (flag) {
                res.send('0');
            } else {
                const sendC = setCode();
                codeMap.set(req.body.email,sendC)
                sendCode(req.body.email, sendC);
            }
        } else {
            const sendC = setCode();
            codeMap.set(req.body.email,sendC)
            sendCode(req.body.email, sendC);
        }
    });
})

// 用户注册逻辑
app.post('/signup', function(req, res) {
    console.log(req.body);
    console.log("code from session", req.session.code);
    let code = codeMap.get(req.body.username);    

    if (req.body.code == code ) {
        if (req.body.pwd == req.body.check_pwd) {
            if (req.body.pwd == '') {
                res.render('signup', { message: "密码数不能为零" });
            } else {
                let newUser = { id: req.body.username, password: req.body.check_pwd };
                console.log(newUser);
                writeJson(newUser);
                res.redirect('protected');
            }
        } else {
            res.render('signup', { message: "两次输入密码不一致" });
        }
    } else {
        res.render('signup', { message: "验证码不正确" });
    }
});

//写入文件
function writeJson(params) {
    fs.readFile('public/json/User.json', function(err, data) {
        if (err) {
            console.error(err);
            throw err;
        }
        var User = data.toString(); //将二进制的数据转换为字符串
        if (User != "") {
            User = JSON.parse(User); //将字符串转换为json对象
        } else {
            User = [];
        }
        User.push(params); //将传来的对象push进数组对象中
        console.log(params);
        var str = JSON.stringify(User);
        fs.writeFile('public/json/User.json', str, function(err) {
            if (err) {
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    });
}

module.exports = app;