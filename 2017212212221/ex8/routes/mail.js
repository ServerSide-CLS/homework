const nodemailer=require('nodemailer');

//设置邮箱和邮件
let transporter = nodemailer.createTransport({
    host: 'smtp.126.com',
    port: 25,
    auth: {
        user: 'hugh_888@126.com', // 发送方邮箱地址
        pass: 'aut1234' // smtp 验证码
    }
});
var code=createVerCode();
let mailObj = {
  from: 'hugh_888@126.com',
  to: '',
  subject: '验证码',
  html: '<p>你的验证码:</p>'+'<p>'+code+'</p>'
};

//生成验证码
function createVerCode(){
    var all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
    var code="";
    for(var i=0;i<4;i++)code+=all[Math.floor(Math.random()*62)];
    return code;
}


module.exports={transporter,mailObj,code}