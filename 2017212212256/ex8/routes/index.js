var express=require('express');
var router = express.Router();

let nodemailer = require('./nodeEmail');
let code = "9999";

const randomCode=()=>{
	return (1000 + Math.round(Math.random() * 10000 -1000))
}
function Check(email) {
    let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return str.test(email);
}
router.get('/email',(req,res,next) => {
    let code1 = [randomCode()]
    nodemailer.sendMail(req,res,code1)
})

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', function (req, res) {
    console.log(req.body);
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
    else if(rePassword === ""){
        res.send('请再次输入密码');
    }
    if(Check(email)){
       if (codeid === code) {
            if (password === doublepassword) {
                res.send('注册成功');
            } 
            else {
                res.send('两次密码不一致');
            }
        } 
        else {
            res.send('验证码错误');
        }
    }
    else {
       res.send('请输入正确的邮箱');
    }
    
});



module.exports = router;

