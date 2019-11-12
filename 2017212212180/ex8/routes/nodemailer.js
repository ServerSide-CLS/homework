const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const checking = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
 const transport = nodemailer.createTransport(smtpTransport({
            host: 'smtp.qq.com', 
    port: 465, 
    // smtp端口
    secureConnection: true, 
    auth: {
        user: '1103580376@qq.com',
        pass: 'nkpnmuerfqozgggh' 
    }
})); 
//验证邮箱
module.exports = {
    sendMailS(req, res, code) {
        let emails = req.query.email;
       
        if (checking.test(emails)) {
            transport.sendMail({
                from: 'SHIMAKAZE<1103580376@qq.com>',
                to: emails,
                subject: 'identification',
                html: '<b>your identification code is: </b><br> ' + code // html body
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
            res.send('please check the email');
        }
    }
};