var express = require("express");
var router = express.Router();
const controller = require("../src/controller");
/* GET home page. */

router.get("/", controller.indexController);

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(controller.signupController);

router.post("/captcha", controller.captchaController);

router.get("/logout", controller.logoutController);

router.post("/login", controller.loginController);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/admin", controller.adminController);

module.exports = router;