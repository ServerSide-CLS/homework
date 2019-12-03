const nodemailer = require("nodemailer");
//发送邮件，smtp方式，
let transporter = nodemailer.createTransport({
    service: 'qq', 
    port: 465,
    secure: true, 
    auth: {
        user: "1042132300@qq.com",
        pass: "zkmqmgsrhzbzbbjh" //授权码
    }
});

function send(email,number){
  let mailOptions={
    from:'"邮箱验证" <1042132300@qq.com>',
    to:email,
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