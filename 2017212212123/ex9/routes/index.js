var express = require('express');
var nodemailer = require('./main');
var router = express.Router();
var fs = require('fs');
var code = "";

function createCode() {
    let num = "";
    for (let i = 0; i < 6; ++i) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

//new mongo
var mongoose = require('mongoose');
mongoose.connection.on('connected', () => {
    console.log('MongoDB连接成功！')
})
mongoose.connection.on('error', () => {
    console.log('MongoDB连接失败！')
})
mongoose.connect('mongodb://localhost/new_db')

var personSchema = mongoose.Schema( {
  email: String,
  password: String
});
var Person = mongoose.model("Person", personSchema)
//mongo end

router.get('/email', (req, res, next) => {
    code = createCode()
    nodemailer.sendMailS(req, res, code)
})

router.get('/', (req, res, next) => {
    res.render('index');
})

router.post('/', function (req, res) {
    let email = req.body.email;
    let codeid = req.body.code;
    let pwd = req.body.password;
    let cpwd = req.body.ConfirmPassword;
    
    if (email == "") {
        res.send('请输入邮箱');
    }
    else if(codeid == "") {
        res.send('请输入验证码');
    }
    else if(pwd == "") {
        res.send('请输入密码');
    }
    else if(cpwd == "") {
        res.send('请再次输入密码');
    }
    if(str.test(email)) {
        Person.find({email: email}, 
            function(err, response){
                console.log(response);
                if (response.length) {
                    res.send('该邮箱已被注册！');
                }
                else {
                    if (codeid == code) {
                        if (pwd == cpwd) {
                            res.send('注册成功！');
                            
                            fs.readFile('user.json', 'utf8', function (err, data) {
                                if (err)
                                    console.log(err)
                                var newUser = {"email": email, "password": pwd}
                                var users = JSON.parse(data)
                                users.data.push(newUser)
                                var usersStr=JSON.stringify(users, "", "\t")
                                fs.writeFileSync('user.json', usersStr)
                            })
            
                            var person = new Person({
                                "email": email,
                                "password": pwd
                            });
                            person.save(function(err, Person) {
                                if (err)
                                    return res.render('admin', {message: "Database error", type: "error"});
                                else
                                    res.render('admin', {
                                        message: "New person added", type: "success"});
                            })
            
                        } 
                        else {
                            res.send('密码不一致！');
                        }
                    } 
                    else {
                        res.send('验证码错误!');
                    }
                }
        })
    }
    else {
        res.send('邮箱格式不正确!');
    }
})


router.get('/login', (req, res, next) => {
    res.render('login');
})

router.post('/login', (req, res, next) => {
    var email = req.body.email;
    var pwd = req.body.password;
    console.log(req.body)

    Person.find({email: email}, 
        function(err, response){
            console.log(response);
            if (!response.length) {
                res.send("请注册后再登录！");
            }
            else if(response[0].password != pwd) {
                res.send("密码错误！");
            }
            else {
                res.render('index2', {user: email});
            }
    })
})

router.get('/admin', (req, res, next) => {
    var str = "";
    Person.find({}, (err, response) => {
        if (err)
            console.log(err)
        else
            for (var i = 0; i < response.length; ++i) {
                str += "<p>Email: " + response[i].email +"</p>";
                str += "<p>Password: " + response[i].password +"</p>";
            }
            res.render('admin', {message: str});
    });
})

router.get('/index2', (req, res) => {
    res.render('index2');
})

module.exports = router;