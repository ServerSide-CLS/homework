const nodemailer = require('nodemailer')

const smtpTransport = require('nodemailer-smtp-transport')

const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.163.com', // 服务
    port: 465, // smtp端口
    // secure: true,
    secureConnection: true, // 使用 SSL
    auth: {
        user: 'kshines1999@163.com', // 发件地址
        pass: 'ysk1111' // 发件密码
    }
}));

const randomFns = () => {
    return (1000 + Math.round(Math.random() * 10000 - 1000)) // 生成4位随机数
};
const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //验证邮箱正则

module.exports = {
    sendMailFn(req, res, code) {
        let EMAIL = req.query.email;
        console.log(EMAIL);
        if (regEmail.test(EMAIL)) {
            transport.sendMail({
                from: 'kshines1999@163.com', // 发件邮箱
                to: EMAIL, // 收件列表
                subject: 'test8', // 标题
                // text:"hello",
                html: '<p>text8</p><p>验证码：<strong style="color: #ff4e2a;">' + code + '</strong></p><p>****该验证码3分钟内有效，3分钟后请重新发送。如果不是您的行为，您的邮箱有被盗号的风险。****</p>' // html 内容
            }, function (error, data) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('邮件发送成功，邮箱帐号：' + data.envelope.to);
                }
                transport.close(); // 如果没用，关闭连接池
            });
            console.log('发送的验证码：' + code);
            res.send(code);
        } else {
            res.send('请检查邮箱！')
        }
    }
};