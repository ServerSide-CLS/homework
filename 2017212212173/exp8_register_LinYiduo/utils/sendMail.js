const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.163.com', 
    port: 25,
    auth: {
        user: 'hznulin@163.com',
        pass: 'linyiduo123123'
    }
}));

function sendMail(email, captchaGenerated){
    // console.log(email);
    transport.sendMail({
        from: 'hznulin@163.com',
        to: email,
        subject: 'EXP8 captcha',
        html: '<p>' + captchaGenerated + '</p>'
    }, function (error, data) {
        if (error) {
            console.error(error);
        } else {
            console.log('邮件发送成功');
        }
        transport.close();
    });
    console.log('发送的验证码：' + captchaGenerated);
    res.send(captchaGenerated);
}

module.exports = { sendMail };