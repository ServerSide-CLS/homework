var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// var check = require('./check');
var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

// 开启一个 SMTP 连接池
var transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.163.com', //主机
    port: 465, // SMTP 端口
    auth: {
        user: '18868182479@163.com', // 发件地址
        pass: 'zpr99278018ls' // 发件密码
    }
}));

//发送邮件
module.exports = {
    sendMailFn(req, res, code) {
        let EMAIL = req.query.email;
        if (EMAIL == "") {
            res.send("请填写邮箱");
        }
        else if (reg.test(EMAIL)) {
            transport.sendMail({
                from: '18868182479@163.com', // 发件地址
                to: EMAIL, // 收件列表
                subject: '实验9', // 标题
                text: "",
                html: '<p>Your code is:<p style="color: #ff4e2a;">' + code + '</p></p>' // html 内容
            }, function (error, data) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('邮件发送成功，邮箱帐号：' + data.envelope.to);
                }
                transport.close(); // 如果没用，关闭连接池
            });
            res.send(code);
        }else{
            res.send("邮箱错误!");
        }
        
    }
};