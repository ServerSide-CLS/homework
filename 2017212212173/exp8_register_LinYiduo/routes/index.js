const express = require('express');
const bodyParser = require('body-parser');
const signUp = require('../utils/signUp');
const sendMail = require('../utils/sendMail');
const router = express.Router();
let captchaGenerated = "";

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next) {
    let email  = req.body.email;
    let password = req.body.password;
    let captcha  = req.body.captcha;
    // console.log("input captcha:" + captcha);
    // console.log("real  captcha:" + captchaGenerated);
    if (captcha == captchaGenerated) {
        // console.log("captcha right!");
        signUp.signUp(email, password);
    } else showMessage('验证码错误！', res);
    
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

function showMessage(message, res){
    var result=`<script>alert('${message}');history.back()</script>`;
    res.send(result);
}

module.exports = router;