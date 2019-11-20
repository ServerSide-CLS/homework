var express = require('express');
var app = express();
var router = express.Router();
var nodemailer=require('../router/nodemailer');
var bodyParser = require('body-parser');
var Users = require('../public/javascripts/connect');

// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 


router.get('/',function(req,res){
    res.render("index");
});

//提交表单
router.post('/',function(req,res){
    Users.findOne({'email':req.body.email},function(err,user){
        if(err){
            console.log(err);
            return;
        }
        //验证Email是否存在以及password是否一致
        else{
            if(user == null){
                res.render("login",{message:"email不存在"});
            }else{
                if(user.password == req.body.password){
                    res.render("admin");
                }else{
                    res.render("login",{message:"密码错误"});
                }
            }
        }
    });
});

module.exports = router;