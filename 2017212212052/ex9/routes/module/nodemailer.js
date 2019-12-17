const nodemailer = require('nodemailer')

const smtpTransport = require('nodemailer-smtp-transport')

const transport = nodemailer.createTransport(smtpTransport({
    service: 'qq', 
    port: 465,
    secure: true, 
    secureConnection: true, // 使用 SSL
    auth: {
        user: '712658976@qq.com', // 发件地址
        pass: 'armfjzrqhahfbfch' // 发件密码
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
                from: '712658976@qq.com', // 发件邮箱
                to: EMAIL, // 收件列表
                subject: 'ex9', // 标题
                // text:"hello",
                html: '<p>ex9</p><p>你的验证码是：<strong style="color: #ff4e2a;">' + code + '</strong></p><p>该验证码5分钟内有效</p>' // html 内容
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