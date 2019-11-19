var express = require('express');
var router = express.Router();
var app = express();
const $ = require('jQuery')(window);
var nodemailer = require('nodemailer');
var fs = require('fs');
let cookieParser = require("cookie-parser")
var bodyParser = require('body-parser');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ex_db', { 
    useNewUrlParser: true,
    useUnifiedTopology: true });

var codeMap = new Map();

var userSchema = mongoose.Schema({
    name: String,
    pwd: String,
});

var User = mongoose.model("User", userSchema);

app.get('/singn', function(req, res, next) {
    res.render('singn', {});
});

app.get('/index', function(req, res, next) {
    res.render('index', {});
});

app.get('/login', function(req, res, next) {
    res.render('login', {});
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('错误!');
});

//生成随机验证码
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
            user: '1114187959@qq.com',
            pass: 'yyy3171969'

        }
    });
    var mailOptions = {
        from: '2557584102@qq.com', 
        to: user,
        subject: '验证码', 
        text:'验证码',
        html: "<h1>这是你的验证码：" + code + "</h1>"
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            throw console.error(err);
        }
    });
}

let DBFALSE = '0';
let EXIST_USER = '1';

app.post('/sendCode', function(req, res) {
    console.log(req.body.email);
    User.find({ name: req.body.email },
        function(err, response) {
            console.log(response);
            if (err) {
                res.send(DBFALSE);
            }
            if (response.length == 0) {
                const sendC = setCode();
                codeMap.set(req.body.email, sendC)
                sendCode(req.body.email, sendC);

            } else {
                res.send(EXIST_USER);
            }
        }
    )
})

app.post('/singn', function(req, res) {
    console.log(req.body);
    let code = codeMap.get(req.body.username);

    if (req.body.code == code) {
        if (req.body.pwd == req.body.check_pwd) {
            if (req.body.pwd == '') {
                res.render('singn', { message: "密码不能为空" });
            } else {
                let newUser = new User({ name: req.body.username, pwd: req.body.check_pwd });
                console.log(newUser);
                newUser.save(function(err, User) {
                    if (err)
                        res.render('singn', { message: "错误！" });
                    else
                        res.redirect('index');
                });
            }
        }
    }
});

app.post('/login', function(req, res) {
    User.find({ name: req.body.username, pwd: req.body.pwd },
        function(err, response) {
            console.log(response);
            if (response.length == 0) {
                res.render('login', { message: "用户名或密码错误" });
            } else {
                res.redirect('index');
            }
            if (err) {
                res.render('login', { message: "查询数据库出现错误" });
            }
        });
})

app.get('/admin', function(req, res) {
    User.find(function(err, response) {
        res.json(response);
    });
});

module.exports = router;
