var mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/user');
//创建Schema
var personSchema = mongoose.Schema({
  userName: String,
  password: String,
  email: String
});
var Person = mongoose.model("Person", personSchema);

module.exports = Person;