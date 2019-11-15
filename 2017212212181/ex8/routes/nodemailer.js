var nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')
// 发送邮件，SMTP
const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.qq.com',
    port: 465,
    auth: {
        user: '3324791952@qq.com', //邮箱账号
        pass: 'devtuqdosorhdaeb'  //授权码
    }
}));

function send(mail){
    //随机生成验证码
    var Code = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);
    transporter.sendMail({
        from:'<3324791952@qq.com>',
        to:mail,
        subject:"验证码",
        html:"注册验证码为：" + Code
    },function (err,res) {
        if(error){
            console.log('error');
        }
        else{
            console.log('success');
        }
    });
};

module.exports = {send};