const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/usr",function(err){
    if(err){
        console.log(err);
    }
});

//数据格式
var personSchema = mongoose.Schema({
    email:String,
    pwd:String
});
var Person = mongoose.model("Person",personSchema);
module.exports = Person;