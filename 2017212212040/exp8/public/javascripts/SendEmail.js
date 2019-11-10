const nodemailer = require("nodemailer");
//发送qq邮件
let transporter = nodemailer.createTransport({
    service: 'qq', 
    port: 465,
    secure: true, 
    auth: {
        user: "2390936581@qq.com",   //发送邮箱帐号
        pass: "xhkvkgtpoahvechh"     //授权码
    }
});

function send(mail,number){
    let mailOptions={
        from:'"fuu" <2390936581@qq.com>',
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