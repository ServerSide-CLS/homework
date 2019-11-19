const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const checking = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.qq.com', 
    // smtp端口
    port: 465, 
    secureConnection: true, 
    //QQ邮箱授权码
    auth: {
        user: '1103580376@qq.com',
        pass: 'nkpnmuerfqozgggh' 
    }
    
})); 
//验证邮箱
module.exports = {
    sendMailS(req,res,code) {
        let emails = req.query.email;
       
        if (checking.test(emails)) {
            //发送邮件
            transport.sendMail({
                //发件人
                from: '<1103580376@qq.com>',
                to: emails,
                //邮件主题
                subject: '用户注册验证码',
                //html内容
                html: '<b>您的验证码是: </b><br> ' + code
            }, function (error, data) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Message sent: ' + data.response);
                }
                transport.close();
            });
            res.send(code);
            console.log('code :' + code);
        }
        else {
            res.send('请确认邮箱');
        }
    }
};

