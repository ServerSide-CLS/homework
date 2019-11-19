const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/user",{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err){
        console.log("connect to mongo error:"+err);
    }
});
var personSchema = mongoose.Schema({
    email:String,
    pwd:String
});
var Person = mongoose.model("Person",personSchema);
module.exports = Person;
