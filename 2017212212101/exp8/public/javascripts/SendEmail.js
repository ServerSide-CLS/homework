const nodemailer = require("nodemailer");
//发送qq邮件
let transporter = nodemailer.createTransport({
    service: 'qq', 
    port: 465,
    secure: true, 
    auth: {
        user: "840499085@qq.com",   
        pass: "iaiedfcnnvmtbdaa"     
    }
});
function send(mail,number){
    let mailOptions={
        from:'"lcj" <840499085@qq.com>',
        to:mail,
        subject:"注册验证码",
        text:`${number}`,
        html:`验证码为:${number}`
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error)
            return console.log(error);
    })
}
module.exports={send}