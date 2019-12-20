var express = require('express');
var router1 = express.Router();
var nodemailer = require('nodemailer');

var tranObject = nodemailer.createTransport ({
    host: 'smtp.163.com',
    port: 465,
    secureConnection: true,
    auth: {
        user:'chen88884444@163.com',
        pass:'chen88884444'
    }
});


router1.get('/',function(req,res){

    //随机生成6位随机数
    var Num="";
    while(Num.length<5){
        Num+=Math.floor(Math.random()*10);
    }

    //把验证码存入session
    req.session.definecode=Num;
    req.session.save();

    //刚刚从前台传过来的邮箱
    var email = req.query.email;

    console.log(req.session.definecode);

    var mail={
        //发件人
        from:'<chen88884444@163.com>',
        //主题
        subject:'您的验证码到喽！',
        //收件人
        to:email,
        //邮件内容
        text:"您申请的动态密码为：" + Num
    };

    //发送邮件
    tranObject.sendMail(mail,function(error,info){
        if(error){
            return console.log(error);
        }
        res.end('success');
    })

})

//导出模块
module.exports = router1;