var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {
        title: '注册页',
        mytitle:'注册'
    });
});

router.get('/email/:email', (req, res) =>{
    let email = req.params.email;
    let code =  ('0000' + Math.floor(Math.random() * 999999)).slice(-4);
    req.session.code = code;
    req.session.save();

    //配置邮箱
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        secureConnection: false,
        port: 465,
        service: "qq",
        auth: {
            user: '1061767858@qq.com',
            pass: 'gingpgxfgjwabfjg'
        }
    });

    //邮箱发送内容
    let mailOptions = {
        from: "1061767858@qq.com",
        to: email,
        subject: '注册验证码',
        html: "<h4>欢迎注册，您本次的注册验证码为："+code+"</h4>",
    };

    transporter.sendMail(mailOptions,function (error,info) {
        if(error){
            res.send({status: "fail"});
        }
        else{
            res.send({status: "success"});
        }
        //验证码发送失败
    });

});

//注册
console.log(111111);
router.post('/register',(req,res) => {
    let info = req.body;
    console.log(info);

    //验证码校验
    if(info.code == req.session.code){
        let data = JSON.parse(fs.readFileSync("user.json"));
        let loginFlag = true;
        console.log(data);

        //判断是否已注册
        for(let i = 0; i < data.length; i++){
            if(info.email == data[i].email){
                loginFlag = false;
                break;
            }
        }

        if(info.passwd != info.repasswd){
            loginFlag = false;
        }

        if(loginFlag === true){
            let user = {
                email: info.email,
                password: info.passwd,
            };
            data.push(user);
            fs.writeFileSync("user.json",JSON.stringify(data));
            res.send({status:"success"});
            res.redirect('index');
        }

        if(loginFlag === false){

            res.send({status:"fail", message:"邮箱已注册"});
        }

    }
    else{
        console.log(req.session.code);
        res.send({status:"fail"});
    }
});

module.exports = router;
