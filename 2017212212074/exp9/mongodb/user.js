var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var user = new Schema({
    email: String,
    password: String
});

var userModel = mongoose.model("user",user);
module.exports = userModel;

