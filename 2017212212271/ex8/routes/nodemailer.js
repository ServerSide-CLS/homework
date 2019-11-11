const nodemailer = require('nodemailer')

const smtpTransport = require('nodemailer-smtp-transport')
const checking = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //验证邮箱正则

const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.qq.com', // 服务
    port: 465, // smtp端口
    // secure: true,
    secureConnection: true, // 使用 SSL
    auth: {
        user: '903268872@qq.com', // 发件地址
        pass: 'bhrwnkqcznjibcca' // 发件密码
    }
}));


module.exports = {
    sendMailS(req, res, code) {
        let EMAIL = req.query.email;
        console.log(EMAIL);
        if (checking.test(EMAIL)) {
            transport.sendMail({
                from: 'SHIMAKAZE<903268872@qq.com>',
                to: EMAIL,
                subject: 'identification',
                html: '<b>your identification code is: </b><br> ' + code // html body
            }, function (error, data) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Message sent: ' + data.response);
                }
                transport.close();
            });
            res.send(code);
            console.log('code :' + code);
        }
        else {
            res.send('please check the email');
        }
    }
};