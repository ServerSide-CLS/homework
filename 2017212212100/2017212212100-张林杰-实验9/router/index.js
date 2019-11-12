var express = require("express");
var router = express.Router();

var register = require("./module/register");
var login = require("./module/login");
var home = require("./module/home");
var admin = require("./module/admin");

/**
 * 注册相关路由
 */
router.use("/", register);


/**
 * 登录相关路由
 */
router.use("/", login);


/**
 *  首页路由
 */
router.use("/", home)


/**
 * 管理员路由
 */
router.use("/", admin);


module.exports = router;