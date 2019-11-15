const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secure: true,
    auth: {
        user: "2393208310@qq.com",
        pass: "vdnzacuzlqkcdjja" // smtp授权码
    }
});

let mail = {
    transporter: transporter,
    send(mail, content, callback) {
        let mailOptions = {
            from: '"注册验证码" <2393208310@qq.com>',
            to: mail,
            subject: "欢迎注册",
            text: `${content}`,
            html: `欢迎注册，你的验证码为：${content}`
        }
        
        // verify connection configuration
        this.transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });
    }
}

module.exports = mail;
