var express = require('express');
var router = express.Router();

let loginRouter = require("./login");
let adminRouter = require("./admin");
let registerRouter = require("./register");

router.get('/', function (req, res, next) {
    res.render('index');
});



router.use("/login", loginRouter);

router.use("/admin", adminRouter);

router.use("/register", registerRouter);

module.exports = router;
