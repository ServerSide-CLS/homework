var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userdb')//连接数据库
mongoose.connection.on("error", (err) => {
    console.error("数据库连接失败:"+ err);
});
mongoose.connection.on("open",() => {
    console.log("数据库连接成功");
});
mongoose.connection.on("disconnected",() => {
    console.log("数据库断开");
})
module.exports = mongoose;