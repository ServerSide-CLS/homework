var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path")
/* GET users listing. */
router.post('/login', function (req, res) {
	var user = req.body.user;
	var pwd = req.body.pwd;

	fs.readFile(path.join(__dirname, "../data/data.json"), "utf-8", function (error, data) {
		if (error) {
			res.send("<h1 style='color:orange'>! Server Error</h1>" + error);
			return;
		} else {
			let arr = JSON.parse(data);
			//遍历数据,找出匹配的对象，返回用户登录成功
			for (let obj of arr) {
				if (obj.user == user && obj.pwd == pwd) {
					res.render('login_success', {user, title: 'Login success'});
					return;
				}
			}

			//遍历数据,找出不匹配的对象，返回登录失敗
			for (let obj of arr) {
				if (obj.user != user && obj.pwd != pwd) {
					res.send("<h1 style='color:red'>! Login fail</h1> userName&Password error" +
						"<script>" +
						"setTimeout(function(){window.location='/login.html'},3000)" +
						"</script>" +
						"<p>登陆失敗! 3秒后自动返回到登陆界面.....</p>");
				} else if (obj.user != user) {
					res.send("<h1 style='color:red'>! Login fail</h1> userName error" +
						"<script>" +
						"setTimeout(function(){window.location='/login.html'},3000)" +
						"</script>" +
						"<p>登陆失敗! 3秒后自动返回到登陆界面.....</p>");
				} else {
					res.send("<h1 style='color:red'>! Login fail</h1> Password error" +
						"<script>" +
						"setTimeout(function(){window.location='/login.html'},3000)" +
						"</script>" +
						"<p>登陆失敗! 3秒后自动返回到登陆界面.....</p>");
				}
				return;
			}
		}
	})
});

router.post('/register', function (req, res) {
	var user = req.body.user;
	var pwd = req.body.pwd;

	fs.readFile(path.join(__dirname, "../data/data.json"), "utf-8", function (error, data) {
		let arr = JSON.parse(data);

		//查询数据库中是否會有用户注册的数据，存在的话，提示用户已存在
		for (let obj of arr) {
			if (obj.user == user) {
			res.send("<h1 style='color:orange'>Register fail</h1>" +
					"<script>" +
					"setTimeout(function(){window.location='/register.html'},3000)" +
					"</script>" +
					"<p>已存在该用户名! 3秒后自动返回到注册页面.....</p>");
				return;
			}
		}

		//不存在的话，向用户返回注册成功，并將数据添加到数据库
		var obj = {"user": user, "pwd": pwd}
		arr.push(obj);
		fs.writeFile("../data/data.json", JSON.stringify(arr), "utf-8", function (error) {
		res.send("<h1 style='color:orange'>Register success</h1>" +
				"<script>" +
				"setTimeout(function(){window.location='/login.html'},3000)" +
				"</script>" +
				"<p>注册成功! 3秒后自动跳转到登陆界面.....</p>");
			return;
		})
	})
});

module.exports = router;
