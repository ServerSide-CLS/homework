const nodemailer = require("nodemailer");
var user = "824781389@qq.com";
var pass = "pmaaxtfaswdxbccj";
var code = Math.random().toString(36).substr(2,4);
const smtpTransport = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: true,
    port: 465,
    auth: {
        user: user,
        pass: pass
    }
});
function sendEmail(email){
    smtpTransport.sendMail({
        from:user,
        to:email,
        subject:"注册邮箱验证",
        html:"验证码为" + code + ",有效期为三分钟"
    },
    function(err,res){
        if(err){
            return {status:500};
        }
    });
    return {status:200,code:code};
}

module.exports = sendEmail;