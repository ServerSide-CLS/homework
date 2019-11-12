const nodemailer = require('nodemailer')

const mailSender = nodemailer.createTransport({
	host: "smtp.qq.com",
	port: 465,
	auth: {
		user: "whosiyuan@qq.com",
		pass: "vhqlapexhornbbed"
	}
})

module.exports = {mailSender}
