const nodemailer = require('routes/nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const checkEmailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.126.com', // smtp服务
    port: 25, // 126邮箱smtp端口
    secureConnection: true,
    auth: {
        user: 'xujianan1998@126.com', //发件地址
        pass: 'xjn19981011' //授权码
    }
}));

module.exports = {
    sendMailFn(req, res, vcode) {
        let EMAIL = req.query.email;
        console.log(EMAIL);
        if (checkEmailReg.test(EMAIL)) {
            transport.sendMail({
                from: 'xujianan1998@126.com',
                to: EMAIL,
                subject: 'Ex.08 Verification Code Email',
                html: '<h2>Ex.08 Verification Code Email</h2><br>' +
                    '<h3> Your Verification Code is:</h3>' +
                    '<p style="color: #c82333">' + vcode + '</p>'+
                    '<br><br><p>Valid in 3 minutes,Send by Xu Jianan</p>'
            }, function (error, data) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Success! Verification Code is:' + vcode);
                }
                transport.close();
            });
            res.send(vcode);
        } else {
            res.send('<h1>Wrong Verification Code</h1>')
        }
    }
};