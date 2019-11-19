var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/new_db',{useNewUrlParser:true, useUnifiedTopology: true});

var UserSchema = mongoose.Schema({
    email: String,
    password: String
});

var User = mongoose.model("User", UserSchema);

module.exports = User;