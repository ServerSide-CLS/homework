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


router.post('/',function(req,res){
	var email=req.body.email;
	var code=createSixNum();

	//邮件信息
	var mail={
		from:'<1185043652@qq.com>',
		subject:'验证码',
		to:email,
		text: '您的验证码是'+code
	};

	Users.findOne({'email':email},function(err,user){
		if(err){
			console.log(err);
			return;
		}
		else{
			if(user==null){
				var newUser= new Users({
					email:email,
					code:code,
					password:""
				});
			
				newUser.save(function(err,Users){
					if(err){
						console.log(err);
					}
					else{
						console.log("验证码写入成功!");
					}
				});
				nodemailer(mail);
			}
			else{
				if(user.password==""){
					user.code=code;
					user.save(function(err,updatedUser){
						if(err){
							console.log(err);
						}
					});
					nodemailer(mail);
				}
				else{
					console.log("邮箱已注册");
					res.render("signup",{message:"邮箱已注册"});
				}
			}
		}
	});

	
	
});

module.exports = router;

//创建验证码
function createSixNum(){
	var num="";
	for(var i=0;i<6;i++){
		num+=Math.floor(Math.random()*10);
	}
	return num;
}