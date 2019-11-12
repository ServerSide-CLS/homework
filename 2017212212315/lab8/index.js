var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs=require('fs');
var hbs = require('express-handlebars');
var cookieParser=require('cookie-parser');
var session = require('express-session');
var nodemailer=require('./js/nodemailer');
var Users = [];

function checkSignIn(req, res, next){
	if(req.session.user){
    	next()    //If session exists, proceed to page
	} else {
		var err = new Error("Not logged in!");
		console.log(req.session.user);
    	next(err)  //Error, trying to access unauthorized page!
	}	
}

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

//读取user.json
try{
	var data=fs.readFileSync('public/user.json','utf-8');
	Users=JSON.parse(data);
}catch(err){
	console.log(err);
}


app.get('/', (req, res) => {
	res.render('signup');
})

//邮箱验证
app.post('/email',function(req,res){
	var email=req.body.email;
	var code=createSixNum();
	var date=new Date();

	//邮件信息
	var mail={
		from:'<search418@yeah.net>',
		subject:'验证码',
		to:email,
		text: '您的验证码是'+code
	};

	var newUser={email:email,code:code};
	Users.push(newUser);
	var str=JSON.stringify(Users,"","\t");
	fs.writeFileSync('public/user.json',str);

	nodemailer(mail);
});

//创建验证码
function createSixNum(){
	var num="";
	for(var i=0;i<6;i++){
		num+=Math.floor(Math.random()*10);
	}
	return num;
}

// 用户注册逻辑
app.post('/signup', function(req, res){
	//读取user.json
	try{
		var data=fs.readFileSync('public/user.json','utf-8');
		Users=JSON.parse(data);
	}catch(err){
		console.log(err);
	}

	var flag=0;
	//检测两次密码是否相同
	if(req.body.password!=req.body.checkPassword){
		flag=1;
	}
	if(flag==0){
		Users.forEach(function(value,index,Users){
			if(value.email==req.body.email){
				//检测验证码是否正确
				if(value.code==req.body.code){
					//将密码写入对应的用户数据中
					Users[index].password=req.body.password;
				}
				else{
					res.render('signup', { message: "验证码错误!"});
				}
			}
		});
		var newUser={email:req.body.email};

		//将更新后的用户数据写入user.json
		var str=JSON.stringify(Users,"","\t");
		fs.writeFileSync('public/user.json',str);
		req.session.user = newUser;
		res.redirect('protected');
	}
	else if(flag==1){
		res.render('signup', { message: "确认密码需要和密码相同!"});
	}
});

// 保护数据页面渲染
app.get('/protected', checkSignIn, function(req, res){
	res.render('protected', {id: req.session.user.email})
});

app.listen(8000);