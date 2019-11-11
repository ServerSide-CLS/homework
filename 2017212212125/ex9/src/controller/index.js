const mailService = require("../lib/mailService");
const validate = require("../lib/validate");
const { getCaptcha } = require("../lib/randomCaptcha");
const authService = require("../lib/authService");
// 获取验证码
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

// 注册,写入数据库
const signupController = async (req, res) => {
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
  const flag = await authService.signup(email, password);
  if (flag) {
    res.send({ code: 0 });
  } else {
    res.send({ code: 1, message: "账号已经存在" });
  }
};

// 注销
const logoutController = (req, res) => {
  res.clearCookie();
  res.redirect("/login");
};

// 首页 获取用户列表
const indexController = async (req, res) => {
  res.render("index", { username: req.session.mail });
};

//  登录
const loginController = async (req, res) => {
  let { email, password } = req.body;
  const flag = await authService.login(email, password);
  if (flag) {
    req.session.role = "master";
    req.session.mail = email;
    res.send({ code: 0 });
  } else {
    req.session.role = "guest";
    res.send({ code: 1, message: "账号或者密码错误" });
  }
};

const adminController = async (req, res) => {
  let userList = await authService.getUserList();
  res.render("admin", { userList });
};
module.exports = {
  captchaController,
  signupController,
  logoutController,
  indexController,
  loginController,
  adminController
};
