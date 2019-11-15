const nodemailer = require("nodemailer");
//发送邮件，smtp方式，
let transporter = nodemailer.createTransport({
    service: 'qq', 
    port: 465,
    secure: true, 
    auth: {
        user: "290162965@qq.com",
        pass: "gxxroimxjcclcaaa" //授权码
    }
});

function send(mail,number){
	let mailOptions={
		from:'"MFY" <290162965@qq.com>',
		to:mail,
		subject:"注册验证码",
		text:`${number}`,
		html:`验证码为:${number}`
	}
	transporter.sendMail(mailOptions,(error,info)=>{
		if(error)
    		return console.log(error);
   		console.log(`Message: ${info.messageId}`);
   		console.log(`sent: ${info.response}`);
	})
}
module.exports={send}