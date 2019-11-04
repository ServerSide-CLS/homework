const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465,// SMTP 端口
    secure: true, // 使用了 SSL
    auth: {
        user: "1176789241@qq.com",
        pass: "puhukiinkyswhbac" // 这里密码不是qq密码，是你设置的smtp授权码
    }
});

let mail = {
    transporter: transporter,
    send(mail, content, callback) {
        let mailOptions = {
            from: '"Blue Sea" <1176789241@qq.com>',
            to: mail,
            subject: "欢迎注册",
            text: `${content}`,
            html: `欢迎注册xxx，你的验证码为：${content}`
        }

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                callback(-1);
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            callback(1); // 成功
        })
    }
}


module.exports = mail;