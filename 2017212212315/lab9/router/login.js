var express = require('express');
var app = express();
var router = express.Router();
var nodemailer=require('../js/nodemailer');
var bodyParser = require('body-parser');
var Users=require('../js/connect');


// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

router.get('/',function(req,res){
    res.render("login");
});

router.post('/',function(req,res){
    Users.findOne({'email':req.body.email},function(err,user){
		if(err){
			console.log(err);
			return;
        }
        else{
            if(user==null){
				res.render("login",{message:"邮箱不存在"});
			}
			else{
				if(user.password==req.body.password){
                    res.render("index");
                }
                else{
                    res.render("login",{message:"密码错误"});
                }
			}
        }
    });
});

module.exports = router;