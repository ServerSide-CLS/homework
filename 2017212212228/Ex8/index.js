var hbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var app = express();
var upload = multer();
var person = [];
var nodemailer = require('nodemailer');
var newaccount = {email:"",pwd:""};
var accept_code;
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine( '.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

// 解析 multipart/form-data
app.use(express.static('public'));
app.get('/', function(req, res){
   res.render('form');
});
app.post('/',function (req, res, next) {
	console.log(req.body);
	var fs = require('fs');
	var s_pwd = req.body.s_pwd;
	newaccount.email=req.body.email;
	newaccount.pwd=req.body.pwd;
	if(newaccount.pwd != s_pwd){
                return res.send("两次密码不一致");
	}
	else{
		fs.readFile('account.json',"utf-8",function(err,data){
			if(err){
				return console.error(err);
			}
			person = data.toString();
			person = JSON.parse(person);
                        for(i=0;i<person.user.length;i++){
                                if(person.user[i].email == newaccount.email){
                                        return res.send("邮箱已被注册");
                                }
                        }
			console.log(accept_code);
			console.log(req.body.code);
			if(accept_code != req.body.code){
				return res.send("验证码错误");
			}
			person.user.push(newaccount);
			var str = JSON.stringify(person);
			fs.writeFile('account.json',str,function(err){
				if(err){
					console.error(err);
				}
				return res.send("注册成功");
			});
		});
	}
});
app.post('/sendEmail',function (req, res, next) {
		var transporter = nodemailer.createTransport({  
		    service: 'smtp.163.com',
		    host: "smtp.163.com",
		    secureConnection: true,
		    port:465,
		    auth: {
		        user: 'cuangaiwushe@163.com',
		        pass: 'willwill1'
		    }
		});
		var code = "";
		for(var i=0;i<6;i++)
		{
			code+=Math.floor(Math.random()*10);
		}
		accept_code = code;
                console.log(code);
		var mail = {
		        from: 'cuangaiwushe@163.com',
		        subject: '接受凭证',//邮箱主题
		        to:req.body.email,//前台传过来的邮箱
		        text: '用'+code+'作为你的验证码'//发送验证码
		};
                console.log(mail);
		transporter.sendMail(mail, function(error, info){
			if(error) {
				return console.log(error);
			}
			console.log('mail sent:', info.response);
		});
});
app.listen(8000);
