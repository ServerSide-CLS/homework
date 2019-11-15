var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var hbs = require('express-handlebars')
var app = express();
var fs = require('fs');

const rt_login = require("./routes/login");
const rt_index = require("./routes/index");

var random_ = require('./public/static/js/random.js');

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

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user_db');

var db = mongoose.connection;
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});
db.on('error', function(){
    console.log('MongoDB Connection Error');
});

var userSchema = mongoose.Schema({
   email: String,
   password: String,
});

var user = mongoose.model("Person", userSchema);

app.get('/admin', function(req, res){
    user.find(function(err, response){
        var user_ = "";
        for(var ever in response) {
            user_ += "邮箱:" + response[ever].email + " 密码:" + response[ever].password + '<br/>';
        }
        res.send(user_);
    });
});

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
        var isRegistered = 0;
        user.find(function(err, response){
            for(var ever in response) {
                if(String(req.body.email) == String(response[ever].email)){
                    isRegistered = 1;
                    break;
                }
            }
            if(isRegistered == 1){
                res.send("该邮箱已被注册");
            }
            else{
                res.send("注册成功");

                user.create({
                    email:req.body.email,
                    password:req.body.password
                },function(err,doc){
                    if(!err){
                        console.log("insert success")
                    }else{
                        console.log(err)
                    }
                })
            }
        });
    }
});

app.post('/Login_', function(req, res){
    user.find(function(err, response){
        if(req.body.email == "" || req.body.password == ""){
            res.send("信息项不完整");
        }
        else{
            var isreg = 1;
            for(var ever in response) {
                if(String(req.body.email) == String(response[ever].email)){
                    if(String(req.body.password) == String(response[ever].password)){
                        res.send("登录成功");
                        isreg = 3;
                    }
                    else{
                        res.send("密码错误");
                        isreg = 0;
                    }
                    break;
                }
            }
            if(isreg == 1){
                res.send("该邮箱未注册");
            }
        }
    });
});

app.use("/", rt_login);
app.use("/", rt_index);

app.listen(3000, () => console.log('listening on port 3000'))