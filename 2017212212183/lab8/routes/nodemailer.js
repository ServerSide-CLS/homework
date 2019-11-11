const nodemailer=require('nodemailer')
const smtpTransport=require('nodemailer-smtp-transport')

const transporter =nodemailer.createTransport(smtpTransport({
    host:"smtp.qq.com",
    secureConnection:true,
    port:465,
    auth:{
        user:'1049668876@qq.com',
        pass:"hdhooqrbmdpbbdhf"
    }
}));

module.exports={
    sendMailFn(req,res,code){
        let email=req.query.email||"1049668876@qq.com";
        console.log(email);
        transporter.sendMail({
            from:"1049668876@qq.com",
            to:email,
            subject:'nodemailer2.5.0 email lab8 send',
            text:'nodemailer2.5.0 email lab8 send ',
            html:'<h1>hello!</h1><br><p>your email-comfirmed code is '+code+'</p>>'
        },function(error,data){
            if(error){
                console.error(error);
            }else{
                console.log("send successfully!");
            }
            transporter.close();
        });
        console.log("send code:"+code);
        res.send(code);
    }
};

