var express=require('express')
var email = require("emailjs");
var router=express.Router()
var Model=require("./model.js");

router.get('/',function(req,res){
    res.render('signup',{layout:false})
})

router.post('/CheckEmail',function(req,res){
    var code = req.body.code;
    var Email = req.body.email;
    var server  = email.server.connect({
        user:    "",      // 用户
        password:"",           // 授权码
        host:    "",         // 主机，不改
        ssl:     true                   // 使用ssl
    });
    //开始发送邮件
    server.send({
        text:    code,   
        from:    "",    
        to:      Email, 
        subject: "验证"
    }, function(err, message) {
        //回调函数
        console.log(err || message);
    });
})
router.post('/signup',function(req,res){
    Model.find({Email:req.body.email},function(err,data){
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
                    Email:req.body.email,
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

router.post('/login',function(req,res){
    Model.find({Email:req.body.email,password:req.body.password},function(err,data){
        if(err){
            console.log("Error"+err);
        }else{
            if(data.length==0){
                res.render('signup',{
                    layout:false,
                    context:"用户未注册或密码错误"
                });
            }else{
                res.render('index',{
                    layout:false,//不需要加载模板
                    context:"登录成功"
                });
            }
        }
    });
})
router.get('/admin',function(req,res){
    Model.find({},function(err,data){
        if(err){
            console.log("Error"+err);
        }else{
            res.json(data);
        }
    })
})
module.exports=router
