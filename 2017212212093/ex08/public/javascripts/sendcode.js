//点击按钮，像邮箱发送验证码

//验证码发送到对应的邮箱里
// ——————————————————————————————————
var Random=Math.random();

var code=Random*9000+1000; //取4位验证码   

var nodemailer = require('nodemailer');
//获取收件邮箱
var getMail="3100628841@qq.com";
// var getMail=document.getElementById("email").value.toString();
// getMail+="@qq.com";
//获取验证码


var transporter = nodemailer.createTransport({
   
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL           
    auth: {                                    
        user: '3100628841@qq.com',              
        //这里密码不是qq密码，是你设置的smtp密码    
        pass: '12345'                           
    }
});

var mailto="";

function sendCode(getMail){
	var mailOptions = {
	    from: '1965687593@qq.com', // 发件地址
	    to: getMail, // 收件地址
	    subject: 'Hello sir', // 标题
	    //text和html两者只支持一种
	    text: code, // 标题
	    html: "<p>code</p>" // html 内容
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);

	});
}

module.exports=sendCode;