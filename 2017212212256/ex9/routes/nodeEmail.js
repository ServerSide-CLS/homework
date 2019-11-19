// const nodemailer = require('nodemailer')
// const smtpTransport = require('nodemailer-smtp-transport')
// const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
// const transport = nodemailer.createTransport(smtpTransport({
// 	host:'smtp.qq.com',
// 	port:465,
// 	secureConnection:true,
// 	auth:{
// 		user:'214270761@qq.com',
// 		pass:'bancclwaahpzbjfh'
// 	}
// }));
// module.exports = {
//     sendMail(req, res, code) {
//         let emails = req.query.email;
       
//         if (checking.test(emails)) {
//             transport.sendMail({
//                 from: '214270761@qq.com',
//                 to: emails,
//                 subject: '验证码',
//                 html: '<p>以下是你的验证码：</p><br> ' + code 
//             }, function (error, data) {
//                 if (error) {
//                     console.error(error);
//                 } else {
//                     console.log('邮件发送成功，邮箱为：' + data.response);
//                 }
//                 transport.close();
//             });
//             res.send(code);
//             console.log('发送的验证码：' + code);
//         }
//         else {
//             res.send('请检查邮箱！');
//         }
//     }
// };

