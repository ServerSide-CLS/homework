var code;
var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport({
  host : 'smtp.qq.com',
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  auth : {
    user : '362352395@qq.com',
    pass : 'ujipgosmlrdwcbef'
  }
});

var sendCode = function (data) {

    code = generateCode();
    mailTransport.sendMail({
 
        from: "362352395@qq.com",
        to: data,
        subject: '验证码',
        html: "验证码为：【"+code+"】"
 
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
    var codeLength=4;
    for(var i =0; i<codeLength; i++){
        code += charArr[Math.floor(Math.random()*charArr.length)];
    }
    return code;
}

module.exports = sendCode;