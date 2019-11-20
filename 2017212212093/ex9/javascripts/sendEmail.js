var nodemailer = require("nodemailer");
var code = Math.random()*9000+1000;

var transport = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: false,
    port: 465,
    auth: {
        user: "3100628841@qq.com",
        pass: 123456
    }
});

function sendEmail(email){
      transport.sendMail({
        from:"3100628841@qq.com",
        to:email,
        subject:"邮箱验证",
        html:"验证码:" + code
    },
    function(error,info){
       if(error){
         console.log(error.message);
        }
        console.log("Successful");
    });
    return {status:200,code:code};
    transport.close();
}

module.exports = sendEmail;