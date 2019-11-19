var express=require('express');
var router = express.Router();
var code = ''
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
var regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
var transport = nodemailer.createTransport(smtpTransport({
    host:'smtp.qq.com',
    port:465,
    secureConnection:true,
    auth:{
        user:'214270761@qq.com',
        pass:'bancclwaahpzbjfh'
    }
}));


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/new_db',{useNewUrlParser:true,useUnifiedTopology:true});
var personSchema = mongoose.Schema({
 email:String,
 password:String
});
var Person = mongoose.model("Person",personSchema);





function Check(email) {
    let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return str.test(email);
}
router.get('/email',(req,res,next) => {
    var code1 = 1000+Math.round(Math.random()*10000-1000);
    console.log(code1)
    var emails = req.query.email;
        if (checking.test(emails)) {
            transport.sendMail({
                from: '214270761@qq.com',
                to: emails,
                subject: '验证码',
                html: '<p>以下是你的验证码：</p><br> ' + code 
            }, function (error, data) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('邮件发送成功，邮箱为：' + data.response);
                }
                transport.close();
            });
            res.send(code);
            console.log('发送的验证码：' + code);
        }
        else {
            res.send('请检查邮箱！');
        }
})

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', function (req, res) {
    let email = req.body.email;
    let codeid = req.body.code;
    let password = req.body.password;
    let doublepassword = req.body.doublepassword;
    if (email === "") {
        res.send('请输入邮箱');
    }
    else if(codeid === ""){
        res.send('请输入验证码');
    }
    else if(password === ""){
        res.send('请输入密码');
    }
    else if(doublepassword === ""){
        res.send('请再次输入密码');
    }
    else if(!Check(email)){
        res.send('请输入正确的邮箱');
       
    }
    else {
       if (codeid != code) {
            res.send('验证码错误');
            
        } 
        else {
            if (password != doublepassword) {
                res.send('两次密码不一致');
            } 
            else {
                Person.find({email:email},function(err,response){
                    if(response.length != 0){
                        res.send("邮箱已被注册");
                    }
                })
                Person.create({
                    email:email,
                    password:password
                },function(err,data){
                    res.render('login');
                })
                
            }
        }
    }
    
});

router.get('/login',(req,res,next)=>{
    res.render('login')
})
router.post('/login',(req,res,next)=>{
    let email = req.body.email;
    let password = req.body.password;
    Person.find({email:email},(err,response)=>{
        if(response.length==0){
            res.send("邮箱未注册");
        }
        else if (response[0].password!=password) {
            res.send("密码错误");
        }
        else{
            res.render('inside');
        }
    })
});
router.get('/admin',(req,res)=>{
    let message="";
    Person.find({},(err,data)=>{
        for(var i=0;i<data.length;i++){
            message += "<p>Email:"+data[i]["emails"]+"</p><p>password:"+data[i]["password"]+"</p><tr>";
        }
        res.render('admin',{message:message});
    })
});
router.get('/inside',(req,res)=>{
    res.render('inside');
})
module.exports = router;

