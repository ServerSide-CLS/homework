const express = require('express');
const bodyParser = require('body-parser');
const signUp = require('../utils/signUp');
const sendMail = require('../utils/sendMail');
var mongoose = require('mongoose');
const router = express.Router();
let captchaGenerated = "";

router.get('/', function(req, res, next) {
    res.render('main');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    let email  = req.body.email;
    let password = req.body.password;
    let captcha  = req.body.captcha;
    
    if (captcha == captchaGenerated) {
        signUp.signUp(email, password);
    } 
    else showMessage('验证码错误！', res);
    
    res.send(req.body.email + 'signed up');
});

router.get('/sendEmail', function(req, res) {
    let email  = req.query.email;
    captchaGenerated = (1000 + Math.round(Math.random() * 10000 - 1000));
    if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email)) {
        sendMail.sendMail(email, captchaGenerated);
    } else {
        res.send('邮箱格式错误!');
    }
});

router.post('/login',function(req, res) {
    signUp.User.find({
            username: req.body.username,
            password: req.body.password
        }, function(err,data) {
        if (err) {
            console.log(err);
        }
        else {
            if (data.length!=0) res.render('index');
            else {
                console.log('登录失败!用户名或密码错误!');
                res.render('login');
            }
        }
    });
})

router.get('/admin',function(req, res) {
    signUp.User.find({}, function(err, data){
        if(err){
            console.log(err);
        }else{
            res.json(data);
        }
    })
})

function showMessage(message, res){
    var result=`<script>alert('${message}');history.back()</script>`;
    res.send(result);
}

module.exports = router;