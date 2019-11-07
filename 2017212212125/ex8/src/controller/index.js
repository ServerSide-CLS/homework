const mailService = require("../lib/mailService");
const validate = require("../lib/validate");
const { getCaptcha } = require("../lib/randomCaptcha");
const authService = require("../lib/authService");

//获取验证码
const captchaController = (req, res, next) => {
  const mail = req.body.email;
  const isRightMail = validate.validateEmail(mail);
  if (isRightMail.result) {
    const captcha = getCaptcha();
    mailService.sendMail(mail, captcha);
    req.session.tep_captcha = captcha;
    req.session.tep_email = mail;
    res.send({ code: 0 });
  } else {
    res.send({ code: 1, message: isRightMail.message });
  }
};


//注册界面
const signupController = (req, res) => {
  const { email, password, password2, captcha } = req.body;
  const captchaValidate = validate.validateCaptcha(
    req.session.tep_captcha,
    captcha
  );
  if (!captchaValidate) {
    res.send({ code: 1, message: "验证码错误" });
    return;
  }
  const passwordValidate = validate.validatePassword(password, password2);
  if (passwordValidate) {
    res.send({ code: 1, message: passwordValidate });
    return;
  }
  const emailValidate = validate.validateEmail(email);
  if (!emailValidate.result) {
    res.send({ code: 1, message: emailValidate.message });
    return;
  }
  req.session.role = "master";
  authService.signup(email, password);
  res.send({ code: 0 });
};

//登出
const logoutController = (req, res) => {
  res.clearCookie();
  res.redirect("/signup");
};


//获取Jason
const indexController = (req, res) => {
  let userList = authService.getUserList();
  res.render("index", { userList, username: req.session.tep_email });
};
module.exports = {
  captchaController,
  signupController,
  logoutController,
  indexController
};
