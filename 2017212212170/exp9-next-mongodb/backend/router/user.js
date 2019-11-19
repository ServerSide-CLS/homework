const express = require('express')
const router = express.Router()
const UserModal = require('../db/models/User')

// 获取用户列表
router.get('/list', async (req, res) => {
	const users = await UserModal.find({})
	res.status(200).json({code: 1, data: {users}, msg: '获取用户列表成功'})
})

// 创建用户
router.post('/create', async (req, res) => {
	const newUser = await UserModal.create({...req.body})
	res.status(200).json({code: 1, data: {newUser}, msg: '新建用户成功'})
})

// 用户登录
router.post('/signup', async (req, res) => {
	const params = req.body
	const user = await UserModal.findOne({email: params.email})

	if (user && user.pwd === params.pwd) {
		res.status(200).json({code: 1, data: {_id: user.id, email: user.email}, msg: '登录成功'})
	} else {
		res.status(200).json({code: 0, data: {}, msg: '邮箱或密码错误！'})
	}
})

module.exports = router
