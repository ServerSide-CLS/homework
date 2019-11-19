//验证码发送和校验用户名是否已经存在
var express = require('express');
var router1 = express.Router();
var nodemailer = require('nodemailer');
var Person = require("./connect");

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
    var key = 0;
    while(Num.length<5){
        Num+=Math.floor(Math.random()*10);
    }

    //把验证码存入session
    req.session.definecode=Num;
    req.session.save();

    //刚刚从前台传过来的邮箱
    var email = req.query.email;


    //获取数据库用户名
    Person.find(function(err, response){
        //转成字符长
        var string_data = JSON.stringify(response);
        //转成数组
        var string_email =eval(string_data);
        for(var i = 0; i < string_email.length ; i++){
            if(string_email[i].email == email){
                key++;
            }
        }
        if( key>0 ){
            res.end('success');
        }else{
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
                console.log('发送成功');
                transporter.close();
            })
        }
   });
})

//导出模块
module.exports = router1;