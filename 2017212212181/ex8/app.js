var createError = require('http-errors');
var express = require("express");
var path = require("path");
var hbs = require("express-handlebars");
var bodyParser = require("body-parser");
var fs = require("fs");
var Code;

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const nodemailer = require("./routes/nodemailer.js");

var app = express();


//渲染主页
app.get("/",function(req,res){
    res.render("index",{layout:"default"});
});

// 设置模板引擎
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"views"));

app.engine(".hbs",hbs({
    extname:".hbs",
    defaultLayout: "default",
    layoutsDir:  __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}));

//点击注册时提交表单
app.post('/index',function (req,res) {
    var flag = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    let mail = req.body.mail;
    let password = req.body.password;
    let passwordRepeat = req.body.passwordRepeat;
    let check = req.body.Code;
    if(password !== passwordRepeat){
        res.send({status:"error",re:"密码不一致"});
    }else if(!flag.test(mail)){
        res.send({status:"error",re:"邮箱格式错误"});
    }
    else if(check !== Code){
        res.send({status:"error",re:"验证码错误"});
    }else {
        res.send({status:"注册成功"});
        fs.writeFileSync("user.json",JSON.stringify({email:mail,password:password}));
    }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(8000);
module.exports = app;