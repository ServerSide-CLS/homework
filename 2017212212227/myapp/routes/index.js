var express = require('express');
var router = express.Router();
var app = express();
const Handlebars = require('handlebars')
var nodemailer = require('nodemailer');
var fs = require('fs');
let cookieParser = require("cookie-parser")
var bodyParser = require('body-parser');
var session = require('express-session');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
const $ = require('jquery')(window);
var c_code;


var codeMap = new Map();


router.get('/', function(req, res, next) {
  res.render('index');
});


//发送验证码
function sendCode(email) {
    var code = "";
    while (code.length < 6) {
        code += Math.floor(Math.random() * 10);
    }
    c_code = code;
    return code;
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '740185140@qq.com',
            pass: 'cblumftpnzgebcib' //授权码,通过QQ获取

        }
    });
    var mailOptions = {
        from: '740185140@qq.com', // 发送者
        to: user, // 接受者,可以同时发送多个,以逗号隔开
        subject: '注册', // 标题
        html: "<h1>欢迎注册，您本次的注册验证码为：" + code + "</h1>"
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            throw console.error(err);
        }
    });
}

router.post('/sendCode', function(req, res, next) {
	let email = req.body.email;
	sendCode(email);
   	
});

router.post('/', function(req, res, next) {
   	let code = req.body.code;
   	let pwd = req.body.pwd;
   	let apwd = req.body.apwd;
   	if(pwd == apwd){
   		if(code == c_code){
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

module.exports = router;
