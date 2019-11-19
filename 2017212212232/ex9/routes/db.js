var mongoose = require("mongoose"); //引入mongoose
mongoose.connect('mongodb://localhost/user'); //连接到mongoDB的todo数据库

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    console.log('connected!');
});
//数据库表(collection)
var ListSchema = new mongoose.Schema({
    user_id: String, 
    email: String, 
    password:String,
    updated_at: Date, 
},{collection:'user'});
mongoose.model('user', ListSchema); //将该Schema发布为Model,user就是集合名称
module.exports = mongoose;