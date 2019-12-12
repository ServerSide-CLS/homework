var code;
var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport({
  host : 'smtp.qq.com',
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  auth : {
    user : '1152460717@qq.com',
    pass : 'kcyndqjembxjgdfa'
  }
});

var sendCode = function (data) {

    code = generateCode();
    mailTransport.sendMail({
 
        from: "1152460717@qq.com",
        to: data,
        subject: '「施莹丹」注册验证码',
        html: "您的注册验证码为：【"+code+"】。若您未注册”施莹丹“，忽略此信息。"
 
    }, function (error, response) {
        if (error) {
            console.log(error);
        }else{
            console.log('发送成功');
        }
    });
    console.log("sendCode:"+code);
    return code;
}


function generateCode(){
    var code="";
    var charArr = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9); 
    var codeLength=6;
    for(var i =0; i<codeLength; i++){
        code += charArr[Math.floor(Math.random()*charArr.length)];
    }
    return code;
}

module.exports = sendCode;