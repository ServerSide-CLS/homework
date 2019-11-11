const getCaptcha = () => {
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += Math.floor(Math.random() * 10);
  }
  return captcha;
};

module.exports = {
  getCaptcha
};
