var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var nodemailer = require('nodemailer');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
var check_code;
router.post('/', function(req, res, next) {
   	let code = req.body.code;
   	let pwd = req.body.pwd;
   	let apwd = req.body.apwd;
   	if(pwd == apwd){
   		if(code == check_code){
	   		fs.readFile('user.json',function(err,data){
		        if(err){
		            return console.error(err);
		        }
		        var user = data.toString();
		        if(user != ""){
		        	user = JSON.parse(user);
		        }else{
		        	user = [];
		        }
		        let newUser = { username: req.body.email, password: req.body.pwd };
		        user.push(newUser);
		        var str = JSON.stringify(user);
		        fs.writeFile('user.json',str,function(err){
		            if(err){
		                console.error(err);
		            }
		            res.send("注册成功");
		      	})
	    	})
   		}else{
   			res.send("验证码错误");
   		}
   	}else{
   		res.send("两次密码不一样");
   	}
});
router.post('/sendCode', function(req, res, next) {
	let email = req.body.email;
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(reg.test(email)){
		sendCode(email);
    	res.send(true);
    }else{
    	res.send(false);
    }
   	
});
function sendCode(email) {
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '905430093@qq.com',
            pass: 'ujmjompglvvzbbbh' 

        }
    });
    var code = "";
    while (code.length < 4) {
        code += Math.floor(Math.random() * 10);
    }
    check_code = code;
    var mailOptions = {
        from: '905430093@qq.com', 
        to: email, 
        subject: '验证码', 
        html: "验证码为：" + code
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            console.log(code);
            return;
        }
    });

}

module.exports = router;
