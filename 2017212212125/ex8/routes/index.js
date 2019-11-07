var express = require("express");
var router = express.Router();
const controller = require("../src/controller");
const user = require("../src/user.json");
/* GET home page. */

router.get("/", controller.indexController);

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(controller.signupController);

router.post("/captcha", controller.captchaController);//验证码

router.get("/logout", controller.logoutController);

module.exports = router;
