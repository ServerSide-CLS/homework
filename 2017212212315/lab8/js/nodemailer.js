//nodemailer.js
const nodemailer = require('nodemailer');
 
//创建一个smtp服务器
const config = {
    host:'smtp.yeah.net',
    port: 25,
    auth: {
        user: 'search418@yeah.net',
        pass: 'zxcv123' 
    }
};
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);
 
//发送邮件
module.exports = function (mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
};