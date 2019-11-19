const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'smtp.qq.com', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465,// SMTP 端口
    secure: true, // 使用了 SSL
    auth: {
        user: "522852329@qq.com",
        pass: "bcizjhkufulxbhej" // smtp授权码
    }
});

let mail = 
{
    transporter: transporter,
    send(mail, content, callback) 
    {
        let mailOptions = 
        {
            from: '"注册验证码" <522852329@qq.com>',
            to: mail,
            subject: "欢迎注册",
            text: `${content}`,
            html: `欢迎注册，你的验证码为：${content}`
        }

        this.transporter.sendMail(mailOptions, (error, info) => 
        {
            if (error) 
            {
                console.log(error)
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