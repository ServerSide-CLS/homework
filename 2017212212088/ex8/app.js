var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var hbs = require('express-handlebars')
var app = express();
var fs = require('fs');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.engine( '.hbs', hbs( {
    extname: '.hbs',
    defaultLayout: 'register',
    layoutsDir:  __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

// 解析 multipart/form-data
app.use(multer()); 
app.use(express.static('public'));

app.get('/', function(req, res){
   res.render('layouts/register', {
        layout: false,
        title: "注册",
        css_href: "/static/css/register.css",
        jquery1:"/static/js/get_code.js",
        jquery2:"/static/js/register.js"
    });
});

'use strict';

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
        host: 'smtp.126.com',
        port: 465,
        secure: true,
        auth: {
            user: "zz212088@126.com",
            pass: "zz212088"
        }
    });

var random_ = require('./public/static/js/random.js');
var Verification_Code = "";
var pre_email = "";

app.post('/Code_', function(req, res){
    Verification_Code = random_.randomWord(true,4,6);
    pre_email = req.body.email;
    let mailOptions = {
        from: '""<zz212088@126.com>',
        to: req.body.email,
        subject: '验证码',
        text:'验证码',
        html: '<b>' + "验证码为" + Verification_Code + '</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
});

app.post('/Messige_', function(req, res){

    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var isok = reg.test(req.body.email);
    if(req.body.password == "" || req.body.ConfirmPassword == "" || req.body.VerificationCode == "" || req.body.email ==""){
        res.send("信息项不完整");
    }
    else if(!isok) {
        res.send("邮箱格式不正确");
    }
    else if(req.body.password != req.body.ConfirmPassword){
        res.send("密码不等于确认密码");
    }
    else if(req.body.VerificationCode != Verification_Code){
        res.send("验证码不正确");
    }
    else if(req.body.email != pre_email){
        res.send("这不是之前获取该验证码的邮箱");
    }
    else{
        res.send("注册成功");
        var data_ = {
            "email":req.body.email,
            "password":req.body.password
        };
        fs.readFile('./public/static/json/user.json',function(err,data){
            if(err){
                return console.error(err);
            }
            var arr = Array();
            var person = data.toString();
            if(person != ""){
                person = JSON.parse(person);
                for(var ever in person) {
                    arr.push(person[ever]);
                }
            }
            arr.push(data_);
            var str = JSON.stringify(arr);
            fs.writeFile('./public/static/json/user.json',str,function(err){
                if(err){
                    console.error(err);
                }
            })
        })
    }
});

app.listen(3000, () => console.log('listening on port 3000'))