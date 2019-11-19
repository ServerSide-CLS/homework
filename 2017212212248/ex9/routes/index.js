var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

// 引用MongoDB
var mongoose = require('mongoose');

//创建一个Schema模型骨架，并且设置好user模版
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email:{type:String},
    password:{type:String}
},{collection: 'user'});

//定义模型
var user = mongoose.model("user",userSchema);


/* GET register page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '注册页',
        mytitle:'注册',
        jquery:"/javascripts/register.js"
    });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: '登录页',
        mytitle:'登录',
        jquery:"/javascripts/register.js"
    });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('home', {
        title: '首页',
        mytitle:'首页',
        jquery:"/javascripts/register.js"
    });
});

/* GET admin page. */
router.get('/admin', function(req, res) {
    user.find(function(err, response) {
        if(err) {
            res.send("error.hbs", {msg: err.toString()});
        }
        console.log(response);
        res.render("admin", {
            title: '信息管理页',
            mytitle:'用户信息',
            jquery:"/javascripts/register.js",
            datas: response
        });
    });
});

//发送邮件验证码
router.get('/email/:email', (req, res) =>{
    let email = req.params.email;
    let code =  ('0000' + Math.floor(Math.random() * 999999)).slice(-4);
    req.session.code = code;
    req.session.save();
    console.log(code);

    //配置邮箱
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        secureConnection: false,
        port: 465,
        service: "qq",
        auth: {
            user: '1061767858@qq.com',
            pass: 'gingpgxfgjwabfjg'
        }
    });

    //邮箱发送内容
    let mailOptions = {
        from: "1061767858@qq.com",
        to: email,
        subject: '注册验证码',
        html: "<h4>欢迎注册，您本次的注册验证码为："+code+"</h4>",
    };

    transporter.sendMail(mailOptions,function (error,info) {
        if(error){
            res.send({status: "fail"});
        }
        else{
            res.send({status: "success"});
        }
        //验证码发送失败
    });

});

//注册
router.post('/register',(req,res) => {
    let info = req.body;
    console.log(info);

    //验证码校验
    if(info.code == req.session.code){
        //判断是否已注册
        user.findOne({"email":info.email}, function (err,data) {
            console.log(111111);
            if(data){
                console.log("no");
                res.send({status:"fail", message:"邮箱已注册"});
            }
            else{
                console.log("yes");
                let newUser = new user({
                    email: info.email,
                    password: info.passwd,
                });
                newUser.save(function (err, user) {
                    if(err) throw err;
                    else{
                        console.log("注册成功");
                        res.redirect('/login');
                    }

                })
            }
        });
    }
    else{
        console.log(req.session.code);
        res.send({status:"fail"});
        res.redirect('/');
    }
});

//登录
router.post('/login',function (req,res) {
    let user_info = {
        email:req.body.email,
        password:req.body.passwd
    };
    user.findOne({
        email:user_info.email,
        password:user_info.password
    }, function (err, data) {
        if(err) throw err;
        if(data){
            console.log("登录成功");
            res.redirect('/home');
        } else{
            res.send({status:"fail", message:"账号或密码错误"})
        }
    })
});

//查询
router.post('/search',function (req, res) {
    let userEmail = req.body.email;
    user.find({
        email:userEmail
    }, function (err, data) {
        if(err) throw err;
        if(data){
            res.render("admin", {
                title: '信息管理页',
                mytitle:'用户信息',
                jquery:"/javascripts/register.js",
                datas: data
            });
        } else{
            res.render("admin", {
                title: '信息管理页',
                mytitle:'用户信息',
                jquery:"/javascripts/register.js",
                datas: data,
                result:"无相关用户信息"
            });
        }
    })

});

module.exports = router;
