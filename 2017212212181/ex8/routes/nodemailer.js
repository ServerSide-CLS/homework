var nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// 发送邮件，SMTP
const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.163.com', //主机
    port: 465, // SMTP 端口
    auth: {
        user: '17376598411@163.com', // 发件地址
        pass: 'slq501266' // 邮箱授权码
    }
}));

//发送邮件
module.exports = {
    sendMailFn(req, res, code) {
    let email = req.query.email;
        transport.sendMail({
            from: '17376598411@163.com',
            to: email,
            subject: '验证码', // 邮件标题
            html: '<p>Your code is:<p>' + code + '</p></p>' // html与text不能同时使用
        }, function (error, data) {
            if (error) {
                console.error(error);
            } else {
                console.log('发送成功');
            }
            transport.close();
        });
        console.log('发送的验证码：' + code);
        res.send(code);
    }
};