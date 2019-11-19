var express = require("express")
var app = express();
var bodyParser=require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/newdb');
var sendMail = require("../public/javascripts/sendMail");
var registerck = require("../public/javascripts/register");
var router = express.Router();
var NAME
router.get("/", (req, res) => {
    res.render('login', { layout: 'layouts' })
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
router.post("/check", (req, res) => {
    let email = req.body.email;
    NAME=req.body.email
    try {
      console.log("1111");
        let code = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);//随机数生成
        sendMail.send(email, code, (state) => {
            console.log(state);//debug
            
            if (state == 1) 
            {
                process.env[email] = code;
                res.send({ msg: "邮件发送成功", code: code });
            } else {
                throw new Error("邮件发送失败");
            }
        })
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
})


router.post("/register", (req, res) => {
    let user = req.body;
    console.log(NAME+"11");
    try{
      registerck.checkemailnum(user.CAPTCHA,process.env[user.email] );
      registerck.checkpassword(user.password,user.checkPassword);
      registerck.Person.find({name:NAME},function(err,response){
          if(response.length==1)
            throw new Error("该邮箱已经被注册")
            console.log(response)
			}); 
      registerck.writedata(req,res,NAME,user.password);
    }catch(e){
      res.send({msg:e.toString()});
    }
})



router.post("/registerWeb",(req,res) =>
{
    res.render('register', { layout: 'layouts' })
})

router.get("/", (req, res) => {
    res.render('login', { layout: 'layouts' })
})

router.get('/admin', function(req, res,next){
    Person.find(function(err, response){
       res.json(response);
    })});
router.post('/login',(req,res,next)=>{
    let email=req.body.email;
    let pwd=req.body.pwd;
    console.log(email)
    var registerck = require("../public/javascripts/register");
    registerck.Person.find({name:email},
        function(err,response){
        if(response.length==0)
        {
            res.render("login",{emailMsg:"该邮箱不存在"})
        }
        else{
            if(response[0].pwd!=pwd){
            res.render("login",{pwdMsg:"密码输入不正确"})
            }
            else
            {
            res.render("index",{success:"登录成功"})
            }
        }
        })
    })
module.exports = router;
