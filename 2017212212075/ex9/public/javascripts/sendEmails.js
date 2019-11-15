// 引入 nodemailer
var nodemailer = require('nodemailer');
var user = '23433653@qq.com';
var pass = 'xopifphjuqofbghi';
// 创建一个SMTP客户端配置
var config = {
    host: 'smtp.qq.com',
    port: 465,
    auth: {
        user: user, //刚才注册的邮箱账号
        pass: pass  //邮箱的授权码，不是注册时的密码
    }
};

// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

// 发送邮件
module.exports = function (mail){
    var checkCode = "";
    var shu = ('1234567890abcdefghijklmnopqrstuvwxyz');
    for (var i=0;i<4;i++){
        var num = parseInt(Math.random() * shu.length);
        checkCode += shu[num];
    }
    transporter.sendMail({
        from:user,
        to:mail,
        subject:"验证码",
        html:"您的验证码为" + checkCode
    },function (err,res) {
        if(err){
            return {status:500};
        }
    });
    return {status: 200,checkCode:checkCode};
};
