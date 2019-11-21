
let mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/new_db", { useNewUrlParser: true, useUnifiedTopology: true });

let userSchema = mongoose.Schema({
    password:String,
    email:String
});

let user = mongoose.model("user", userSchema);

module.exports = {
    user
};