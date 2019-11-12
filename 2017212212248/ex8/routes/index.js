var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {
        title: '注册页'
    });
});

router.get('/email/:email', (req, res) =>{
    let email = req.params.email;
    let code =  ('0000' + Math.floor(Math.random() * 999999)).slice(-4);

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
            res.send({status:"fail"})
        }
        //验证码发送失败
    });

});

router.post('/register',(req,res) => {
    let info = req.body;
    console.log(info);
    //验证码校验
    if(info.code == code){
        let user = {
            email: info.email,
            password: info.passwd,
        };
        let data = JSON.parse(fs.readFileSync("user.json"));
        data.push(user);
        fs.writeFileSync("user.json",JSON.stringify(data));
        res.send({status:"success"});
    }
    else{
        res.send({status:"fail"});
    }
});

module.exports = router;
