//把与mongoose连接封装成一个模块
//调用调用 Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/newdb',{ useNewUrlParser: true });

var personSchema = mongoose.Schema({
  email: String,
  secret: Number,
  data: String
});

var Person = mongoose.model("Person", personSchema);

//导出模块
module.exports = Person;