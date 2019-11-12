const express = require("express");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");
let Code;

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname, '/public')));
const nodemailer = require("./routes/nodemailer.js");

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


app.post('/index',function (req,res) {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    let user = req.body.user;
    let mail = req.body.mail;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    let check = req.body.Code;
    if(password !== cpassword){
        res.send({status:"error",re:"password error！"});
    }else if(!reg.test(mail)){
        res.send({status:"error",re:"email error！"});
    }
    else if(check !== Code){
        res.send({status:"error",re:"code error！"});
    }else {
        res.send({status:"success"});
        fs.writeFileSync("user.json",JSON.stringify({user:user,email:mail,password:password}));
    }
});


app.listen(3000, () => console.log(`listen on 3000!`));