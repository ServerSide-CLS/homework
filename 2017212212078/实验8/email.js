var nodemailer  = require('nodemailer');
var fs = require('fs');
var code;

var mailTransport = nodemailer.createTransport({
    host : 'smtp.qq.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : '2664187484@qq.com',
        pass : 'wgtwwhgsdfgvvs'
    },
  });

var sendMail = function (recipient) {

    code = createCode();
    mailTransport.sendMail({
 
        from: "2664187484@qq.com",
        to: recipient,
        subject: '注册验证码',
        html: "您本次验证码为："+code
 
    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功')
    });
    return code;
}


function createCode(){//验证码
    var select = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，也可以用中文的 
    code="";
    var codeLength=5;//验证码的长度
    for(var i =0;i<codeLength;i++){
        var index = Math.floor(Math.random()*select.length)//随机数
        code +=select[index];
    }
    return code;
}

module.exports = sendMail;