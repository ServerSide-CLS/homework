const nodemailer = require("nodemailer");
const { config } = require("../config");
let transporter = nodemailer.createTransport(config);

function sendMail(to, captcha) {
  let sendOption = {
    from: `app ${config.auth.user}`,
    to,
    subject: "app signup",
    text: "本次的验证码:" + captcha + "\n请不要轻易透露！"
  };
  transporter.sendMail(sendOption, (error, info) => {
    if (error) return console.log(error);
  });
}

module.exports = {
  sendMail
};
