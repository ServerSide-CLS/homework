const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: '163',
    post: 465,
    secure: true,
    auth: {
        user: "18196777756@163.com",
        pass: "730623sjq"
    }
});

let mail = {
    transporter: transporter,
    send(email, content, callback) {
        let mailProperty = {
            from: '"KJ" <18196777756@163.com>',
            to: email,
            subject: "Welcome to register",
            text: content,
            html: "<b>Your Code is </b>" + content
        }

        this.transporter.sendMail(mailProperty, (error, info) => {
            if (error) {
                callback(500);
                return console.log(error);
            }
            callback(200);
        })
    }
}

module.exports = mail;