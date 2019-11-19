const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: String,
	pwd: String,
})

const UserModal = mongoose.model('user', userSchema)

module.exports = UserModal
