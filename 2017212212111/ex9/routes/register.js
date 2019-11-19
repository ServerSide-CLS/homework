var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/new_db',{ useNewUrlParser: true,useUnifiedTopology: true });

let sendmail = require('./nodemailer');
let code = "0000";

function createSixCode() {
   let all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
   let num = "";
   for (let i = 0; i < 4; ++i) {
       let index = Math.floor(Math.random() * 62);
       num += all.charAt(index);
   }
   return num;
}

//发送邮件
router.get('/email', function (req, res, next) {
   code = createSixCode();
   alert(code);
   sendmail.sendMailFn(req, res, code);
});

function emailTest(email) {
   let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
   return reg.test(email);
}

var personSchema = mongoose.Schema({
    email: String,
    password: Number,
 });

var Person = mongoose.model("Person", personSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

 app.get('/person', function(req, res){
    res.render('person');
 });
 app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
    Person.find(function(err, response){
        res.json(response);
    })

    if(!personInfo.email || !personInfo.verification || !personInfo.password || !personInfo.rePassword){
       res.render('show_message', {
          message: "Sorry, you provided worng info", type: "error"});
    } 
    else {
       var newPerson = new Person({
          email: personInfo.email,
          code: personInfo.verification,
          password: personInfo.password,
          rePassword: personInfo.rePassword
       });

       Person.findOne({email: newPerson.email}, function (err, data) {
        if (data) {
            res.send('邮箱已被注册');
        } 
        else {
            // 保存到数据库
            newPerson.save(function(err, Person){
                if(err)
                   res.render('show_message', {message: "Database error", type: "error"});
                else
                   res.render('show_message', {
                      message: "New person added", type: "success", person: personInfo});
            });
        }
       });
    }
 });