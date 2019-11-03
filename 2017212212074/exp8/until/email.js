//nodemailer
const nodemailer = require('nodemailer');
let user = "848453404@qq.com"
let pass = "tytvqybwluyxbche"
let host = 'smtp.qq.com'

const smtpTransport = nodemailer.createTransport({
    // service: 'qq',
    host: host,
    secureConnection: true,
    port: 465,
    auth: {
        user: user,
        pass: pass
    }
});
module.exports = function sendMail(email,code) {
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail({
            from: user,
            //'li@latelee.org, latelee@163.com',//收件人邮箱，多个邮箱地址间用英文逗号隔开
            to: email,
            subject: '注册邮箱验证',//邮件主题
            // text    : "test2",
            html: "验证码为"+code+"  注意有效期为三分钟！"
        }, function (err, response) {
            if (err) {
                reject({ code: 3000, message: err.response })
            }
            else {
                resolve({ code: 2000, message: "邮件已发送！" })
            }
        });
    })


}