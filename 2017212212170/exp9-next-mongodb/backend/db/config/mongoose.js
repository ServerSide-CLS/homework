const mongoose = require('mongoose')
const config = require('./config')

module.exports = () => {
	mongoose.connect(config.mongodb, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true
	})

	// 实例化连接对象
	const db = mongoose.connection
	db.on('error', console.error.bind(console, '连接错误：'))
	db.once('open', () => {
		console.log('MongoDB连接成功！！')
	})

	return db
}
