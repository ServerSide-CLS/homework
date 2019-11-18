var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/lab9');

var userSchema = mongoose.Schema({
    username: String, 
    password: String 
});
var User = mongoose.model('User', userSchema);

function signUp(email, password){
    let FLAG = false;
    User.find({username:email}, function (err, res) {
        if (err) console.log(err);
        else if (res.length != 0) {
            console.log("用户已存在!");
            FLAG = true;
        }
        if (!FLAG) {
            User.create({
                username: email,
                password: password
            }, function (err, res) {
                if (err) {
                    console.log(err);
                }
                console.log("注册成功!");
            });
        }
    });
}

module.exports = { signUp, User, userSchema };