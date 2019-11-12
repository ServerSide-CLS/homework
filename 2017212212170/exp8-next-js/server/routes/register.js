const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.resolve(__dirname, "../data/user.json"))
const db = low(adapter)

async function sendVercode(to, vercode) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount()

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.qq.com',
		port: 465,
		auth: {
			user: 'whosiyuan@qq.com',
			pass: 'vhqlapexhornbbed'
		}
	})

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: 'whosiyuan@qq.com', // sender address
		to: to, // list of receivers
		subject: 'HSY的邮箱验证码', // Subject line
		text: `验证码：${vercode}`, // plain text body
		html: `<span>来自HSY的验证码：<h5>${vercode}</h5></span>` // html body
	})

	console.log('Message sent: %s', info.messageId)
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

	return info
}

router.post('/', async (req, res) => {
	const user = await db
		.get("users")
		.push(req.body)
		.last()
		.assign({ id: Date.now().toString() })
		.write()

	console.log(user)

	res.status(200).json({code: 200, data: {user}, msg: '添加成功！'})
})

router.post('/vercode', async (req, res) => {
	const vercode = String(new Date().getTime()).slice(-4)
	const to = req.body.email
	const sr = await sendVercode(to, vercode)
	res.status(200).json({code: 200, data: {vercode}, msg: '发送验证码成功！'})
})

module.exports = router
