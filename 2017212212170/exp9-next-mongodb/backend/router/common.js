const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const UserModal = require('../db/models/User')

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

/**
 * 获取验证码
 */
router.post('/vercode', async (req, res) => {
	const params = req.body
	const user = await UserModal.findOne({email: params.email})

	if (user) {
		res.status(200).json({code: 0, data: {}, msg: '该邮箱已被使用'})
	} else {
		const vercode = String(new Date().getTime()).slice(-4)
		const to = req.body.email
		const sr = await sendVercode(to, vercode)
		res.status(200).json({code: 1, data: {vercode}, msg: '发送验证码成功！'})
	}
})

module.exports = router
