function validateEmail(mail, mail2) {
  let result = false;
  if (mail2 !== mail) {
    message = "与接收验证码的邮箱不一致";
  }
  var rep = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  result = rep.test(mail);
  if (!result) {
    message = "邮箱格式不正确";
  }
  return { result, message };
}

function validatePassword(password, password2) {
  if (password.length < 6) {
    return "密码长度不能小于6位";
  }
  if (password !== password2) {
    return "两次密码不一致";
  }
  return false;
}

function validateCaptcha(c1, c2) {
  return c1 === c2;
}
module.exports = {
  validateEmail,
  validatePassword,
  validateCaptcha
};
