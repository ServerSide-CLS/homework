var express = require('express');
var mongoose = require('mongoose');
var nodemailer=require('nodemailer');
var router = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/new_db',{useNewUrlParser:true},function(err){
    if(err){
        console.log('Connection Error'+err);
    }else{
        console.log('Connection success');
    }
});

var personSchema = mongoose.Schema({
  email: String,
  password: String
});
var Person = mongoose.model("Person", personSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '主界面' });
});

router.get('/user', function(req, res, next) {
    res.clearCookie('Captcha');
    res.render('user', { title: '用户注册页面' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: '用户登录页面' });
});

router.get('/admin',function(req,res,next){
    Person.find(function(err, response){
        res.render('admin',{person:response});
   });
})

router.post('/user', function(req, res){
    console.log(req.body);
    console.log(req.cookies);

    var re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;

    var isOk=true;

    if(isOk===true&&!re.test(req.body.email)){
        res.send('邮箱格式错误');
        isOk=false;
    }

    if(isOk===true&&req.body.password!==req.body.passwordAgain){
        res.send('两次密码输入不同');
        isOk=false;
    }

    if(isOk===true&&req.cookies.Captcha!==req.body.Captcha){
        res.send('验证码输入错误');
        isOk=false;
    }

    if(isOk===true){
        var obj = new Person({
            email:req.body.email,
            password:req.body.password
        });

        Person.find({email: req.body.email}, 
            function(err, response){
                if(response.length>0){
                    res.send('用户已注册');
                }
                else{
                    obj.save(function(err){
                        if(err)
                           res.send('Database error');
                    });
                    res.send('注册成功');
                }
            });
    }
});

router.post('/login',function(req,res){
    console.log(req.body);
    Person.find({email: req.body.email,password:req.body.password}, 
    function(err, response){
        if(response.length>0){
            res.send(req.body.email+',登录成功');
        }
        else{
            res.render('login',{title:'登录失败'});
        }
    });
})

router.post('/mails', function(req,res){
    console.log(req.body);

    var transporter = nodemailer.createTransport({
        service:"qq",
        auth:{
            user:'272930349@qq.com',
            pass:'zsebezqkuyywbiei'
        }
    });

    var mailOption={
        from:"272930349@qq.com",
        to:req.body.mail,
        subject:"注册校验码",
        html:"<h1>您本次的注册验证码为："+req.body.Captcha+"</h1>"
    };

    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('发送成功');
    });
})

module.exports = router;