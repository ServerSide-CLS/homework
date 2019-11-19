//nodemailer.js
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.sina.cn',
    port: 465,
    auth: {
        user: 'zx5601030@sina.cn',
        pass: '794139e9117b5a1a'
    },
});

var sendMail = function (recipient) {
    let code = createCode();
    transporter.sendMail({

        from: "zx5601030@sina.cn",
        to: recipient,
        subject: '验证码',
        html: "您本次的验证码为：" + code

    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        else console.log('发送成功')
    });
    return code;
}


function createCode() { //验证码
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

module.exports = sendMail;