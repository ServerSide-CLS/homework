var mongoose = require("mongoose");
var config = require("../config");


/**
 * 连接数据库
 */
mongoose.connect(config.mongoIp, { useNewUrlParser: true, useUnifiedTopology: true });


/**
 * 构建Schema
 */
var personSchema = mongoose.Schema({
    email: String,
    password: String,
    code: String
})


/**
 * 构建视图,类
 */
var Person = mongoose.model("Person", personSchema);



module.exports = {
    Person
}