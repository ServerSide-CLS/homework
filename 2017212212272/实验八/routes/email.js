var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

var email = {
  service: 'QQ',
  user: '312563544@qq.com',
  pass: 'vcnmkveswljkbhea',
}

smtpTransport = nodemailer.createTransport(smtpTransport({
  service: email.service,
  auth: {
      user: email.user,
      pass: email.pass
  }
}));

module.exports = {
  sendMail(req, res, code) {
    let emails = req.query.email;
   
      smtpTransport.sendMail({
          from: email.user,
          to: emails,
          subject: '验证',
          html: '<b>你的验证码为 </b><br> ' + code
      }, function (error, data) {
          if (error) {
              console.error(error);
          } else {
              console.log('Message sent: ' + data.response);
          }
          smtpTransport.close();
        });
    }
};