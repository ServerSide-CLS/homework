var fs = require('fs');

//写入json文件
var userinfo=[];
function writetojason(user){
    var filepath="user.json";
    fs.readFile(filepath,'utf8',function (err, data){
        var info = {
            "email":user.email,
            "password":user.pwd,
        };
        userinfo = JSON.parse(data);
        userinfo.push(info);
        fs.writeFileSync(filepath,JSON.stringify(userinfo,"","\t"));
    });
}
//生成验证码
function CreateVCode(){
    var arr = ['0','1','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    str = "";
    var strlength = 4;
    for(var i = 0; i < strlength; i++){
        var num = Math.floor(Math.random()*arr.length);
        str+= arr[num];
    };
    return str;
}
//验证邮箱格式
function CheckMail(email){
    var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    return email.length<25 && reg.test(email);
}
//确认密码和密码是否一致
function CheckPwd(pwd,cfmpwd){
    return pwd!='' && pwd == cfmpwd;
}
//校对验证码
function checkVCode(vcode,checkVcode){
    return checkVcode!='' && vcode == checkVcode;
}
//发送邮件
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '1927236438@qq.com',
    pass: 'gmgsuwwvrwxjejif' //授权码,通过QQ获取
  }
});
function sendMail(vcode,mail){
    var mailOptions = {
        from: '1927236438@qq.com',
        to: mail,
        subject: '验证码校验',
        text: vcode,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
      });
      transporter.close();
      
}
module.exports = {
    writetojason,
    CheckMail,
    CheckPwd,
    checkVCode,
    sendMail,
    CreateVCode,
}