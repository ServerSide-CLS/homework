const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()        //part of next config

// const db = mongoose.connect('mongodb://localhost:27017/Exp7DB')

nextApp.prepare().then(() => {
	const app = express()

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))
	app.use('/api/register', require('./routes/register'))
	// 除了 /api 外所有路由交给 next.js 处理
	app.get('*', (req, res) => {
		return handle(req, res) // for all the react stuff
	})

	app.listen(PORT, err => {
		if (err) throw err
		console.log(`ready at http://localhost:${PORT}`)
	})
})
