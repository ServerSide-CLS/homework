var express = require('express');
var router = express.Router();
var app = express();
var sendMail = require('nodemailer');
var fs = require('fs'); // 引入fs模块
var bodyParser = require('body-parser');
const Handlebars = require('handlebars');
let cookieParser = require("cookie-parser");
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/new_db',{ useNewUrlParser: true,useUnifiedTopology: true });

var codeMap = new Map();

var personSchema = mongoose.Schema({
    email: String,
    password: String,
 });

var Person = mongoose.model("Person", personSchema);

//注册页
router.get('/',function(req,res,next){
   res.render('index',{title:'Express'});
})

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

/* GET signup page. */
app.get('/register', function(req, res, next) {
    res.render('register', {});
});

/* GET index page. */
app.get('/index', function(req, res, next) {
    res.render('index', {});
});

/* GET index page. */
app.get('/login', function(req, res, next) {
    res.render('login', {});
});

//错误处理
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//生成随机验证码
function setCode() {
    var code = "";
    while (code.length < 5) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

//发送验证码
    const smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
      host: 'smtp.163.com', // 服务
      port: 465, // smtp端口
      // secure: true,
      secureConnection: true, // 使用 SSL
      auth: {
          user: 'dch6xqy@163.com', // 发件地址
          pass: '111111' // 发件密码
      }
    }));
    const randomFns = () => {
      return (1000 + Math.round(Math.random() * 10000 - 1000)) // 生成4位随机数
  };
  const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //验证邮箱正则
  
  module.exports = {
      sendMailFn(req, res, code) {
          let EMAIL = req.query.email;
          console.log(EMAIL);
          if (regEmail.test(EMAIL)) {
              transport.sendMail({
                  from: 'dch6xqy@163.com', // 发件邮箱
                  to: EMAIL, // 收件列表
                  subject: 'ex9', // 标题
              }, function (error, data) {
                  if (error) {
                      console.error(error);
                  } else {
                      console.log('邮件发送成功，邮箱帐号：' + data.envelope.to);
                  }
                  transport.close(); // 如果没用，关闭连接池
              });
              console.log('发送的验证码：' + code);
              res.send(code);
          } else {
              res.send('请检查邮箱！')
          }
      }
  };

// 用户注册逻辑
app.post('/register', function(req, res) {
    console.log(req.body);
    //console.log("code from session", req.session.code);
    let code = codeMap.get(req.body.email);

    if (req.body.verification == code) {
        if (req.body.password == req.body.rePassword) {
            if (req.body.password == '') {
                res.render('register', { message: "密码数不能为零" });
            } else {
                let newUser = new Person({ name: req.body.email, pwd: req.body.rePassword });
                console.log(newUser);
                newUser.save(function(err, Person) {
                    if (err)
                        res.render('register', { message: "Database error" });
                    else
                        res.redirect('index');
                });
            }
        }
    }
});

//用户登录逻辑
app.post('/login', function(req, res) {
    User.find({ email: req.body.email, password: req.body.password },
        function(err, response) {
            console.log(response);
            if (response.length == 0) {
                res.render('login', { message: "用户名或密码错误" });
            } else {
                res.redirect('index');
            }
            if (err) {
                res.render('login', { message: "查询数据库出现错误" });
            }
        });
})

//查询所有用户的列表信息
app.get('/admin', function(req, res) {
    User.find(function(err, response) {
        res.json(response);
    });
});



module.exports = app;