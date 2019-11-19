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

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sys', { useNewUrlParser: true, useUnifiedTopology: true });
var userSchema = mongoose.Schema({
    name: String,
    pwd: String,
});
var User = mongoose.model("User", userSchema);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.set('trust proxy', 1)

app.get('/signup', function(req, res, next) {
    res.render('signup', {});
});

app.get('/index', function(req, res, next) {
    res.render('index', {});
});

app.get('/login', function(req, res, next) {
    res.render('login', {});
});

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


function sendCode(user, code) {
    console.log(user, code);
    var transporter = nodemailer.createTransport({
        service: 'smtp.qq.com',
        auth: {
            user: '362352395@qq.com',
            pass: 'ujipgosmlrdwcbef' 

        }
    });
    var mailOptions = {
        from: '362352395@qq.com', 
        to: user, 
        subject: '验证码',
        html: "<h1>验证码为：" + code + "</h1>"
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

app.post('/signup', function(req, res) {
    console.log(req.body);
    
    let code = codeMap.get(req.body.username);

    if (req.body.code == code) {
        if (req.body.pwd == req.body.check_pwd) {
            if (req.body.pwd == '') {
                res.render('signup', { message: "密码数不能为零" });
            } else {
                let newUser = new User({ name: req.body.username, pwd: req.body.check_pwd });
                console.log(newUser);
                newUser.save(function(err, User) {
                    if (err)
                        res.render('signup', { message: "Database error" });
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

module.exports = app;