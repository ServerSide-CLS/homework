var express=require('express');
var email = require("emailjs");
var Model = require('./model.js')
var router=express.Router()


router.get('/',function(req,res){
    res.render('signup',{layout:false})
})

router.post('/CheckEmail',function(req,res){
    var code = req.body.code;
    var mail = req.body.mail;
    var server  = email.server.connect({
        user:    "1335678519@qq.com",      // 你的QQ用户
        password:"xrrwwjncnygzfgii",           // 注意，不是QQ密码，而是刚才生成的授权码
        host:    "smtp.qq.com",         // 主机，不改
        ssl:     true                   // 使用ssl
    });
    //开始发送邮件
    server.send({
        text:    code,       //邮件内容
        from:    "1335678519@qq.com",        //谁发送的
        to:      mail,       //发送给谁的
        subject: "test!!"          //邮件主题
    }, function(err, message) {
        //回调函数
        console.log(err || message);
    });
})

router.post('/signup',function(req,res){
    Model.find({mail:req.body.email},function(err,data){
        if(err){
            console.log("Error"+err);
        }else{
            if(data.length!=0){
                res.render('signup',{
                    layout:false,
                    context:"用户已注册"
                });
            }else{
                Model.create({
                    mail:req.body.email,
                    password:req.body.password
                },function(err,doc){
                    if(err){
                        console.error(err);
                    } else {
                        console.log(doc);
                        res.render('login',{
                            layout:false,
                            context:"注册成功"
                        });
                    }
                })
            }
        }
    });
})

router.get('/Login',function(req,res){
    res.render('login',{layout:false})
})

router.post('/LoginCheck',function(req,res){
    Model.find({mail:req.body.mail,password:req.body.password},function(err,data){
        if(err){
            console.log("Error"+err);
        }else{
            if(data.length==0){
                res.render('login',{
                    layout:false,
                    context:"账号或密码错误"
                });
            }else{
                res.render('index',{
                    layout:false,
                    name:req.body.mail
                })
            }
        }
    });
})

router.get('/admin',function(req,res){
    Model.find({},function(err,data){
        if(err){
            res.send(err.message)
        }else{
            res.send(data)
        }
    })
})


module.exports=router;