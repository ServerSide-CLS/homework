var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs=require('fs');
var hbs = require('express-handlebars');
var cookieParser=require('cookie-parser');
var session = require('express-session');
var sendEmail=require('./router/email');
var admin=require('./router/admin');
var login=require('./router/login');

var Users=require('./js/connect');


//模板引擎
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.engine( '.hbs', hbs( {
	extname: '.hbs',
	defaultLayout: 'default',
	layoutsDir:  __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));

// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser());
app.use(session({
	resave: false, 
	saveUninitialized: true, 
	secret:"Your secret key"}));

//注册页面渲染	
app.get('/', (req, res) => {
	res.render('signup');
})

//邮箱验证
app.use('/email',sendEmail);

//用户信息
app.use('/admin',admin);

// 用户注册逻辑
app.post('/signup', function(req, res){

	var flag=0;
	//检测两次密码是否相同
	if(req.body.password!=req.body.checkPassword){
		flag=1;
	}
	if(flag==0){
		Users.findOne({'email':req.body.email},function(err,user){
			if(err){
				console.log(err);
				return;
			}
			if(user.code==req.body.code){
				user.password=req.body.password;
				user.save(function(req,updatedUser){
					if(err){
						console.log(err);
						return;
					}
				});
				res.redirect('login');
			}
			else{
				res.render('signup', { message: "验证码错误!"});
			}
		});
		
	}
	else if(flag==1){
		res.render('signup', { message: "确认密码需要和密码相同!"});
	}
});

// 登录页面渲染
app.use('/login',login);

//index页面
app.get('/index',function(req,res){
	res.render("index");
});

app.listen(8900);