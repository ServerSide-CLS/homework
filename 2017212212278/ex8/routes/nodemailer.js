// 引入 nodemailer
var nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')
// 创建一个SMTP客户端配置
const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.qq.com',
    port: 465,
    auth: {
        user: '2351413993@qq.com', //邮箱账号
        pass: 'sljlsraessqpebbg'  //邮箱的授权码
    }
}));


// 发送邮件
module.exports = function (mail){
    var Code;
    for (var i=0;i<6;i++){
        var number = ('1234567890abcdefghijklmnopqrstuvwxyz');
        var x = parseInt(Math.random() * number.length);
        Code += number[x];
    }
    transporter.sendMail({
        from:user,
        to:mail,
        subject:"验证码",
        html:"your code is " + Code
    },function (err,res) {
        if(error){
            console.log('error');
        }
        else{
            console.log('success!!');
        }
    });
};
