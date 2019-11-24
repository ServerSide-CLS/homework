let mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let userSchema = mongoose.Schema({
    email: String,
    password: String
});

let user = mongoose.model("user", userSchema);

module.exports = user;