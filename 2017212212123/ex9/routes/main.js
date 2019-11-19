const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const flag = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.qq.com', 
    port: 465, 
    secureConnection: true, 
    auth: {
        user: '1670074727@qq.com',
        pass: 'nihyytlatbmidbgi' 
    }
})); 

module.exports = {
    sendMailS(req, res, code) {
        let emails = req.query.email;
        if (flag.test(emails)) {
            transport.sendMail({
                from: '<1670074727@qq.com>',
                to: emails,
                subject: 'code',
                html: '<p>验证码：</p>' + code
            }, function (error, data) {
                if (error) {
                    console.error(error);
                } else {
                    console.log(data.response);
                }
                transport.close();
            });
            res.send(code);
            console.log('code :' + code);
        }
        else {
            res.send('请输入正确的邮箱格式。');
        }
    }
};

