const nodemailer=require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.163.com', 
    port: 465, // 端口号
    secure: true, 
    auth: {
		user: "hestervvv@163.com", // 发送方邮箱
        pass: "qbd123" // smtp 验证码
    }
});
var code=createVerCode();
let mailObj = {
  from: 'hestervvv@163.com',
  to: '',
  subject: '验证码',
  html: '<p>你的验证码:</p>'+'<p>'+code+'</p>'
};

//生成验证码
function createVerCode(){
    var code="";
	for(var i=0;i<6;i++)
	{
		code+=Math.floor(Math.random()*10);
	}
    return code;
}


module.exports={transporter,mailObj,code}