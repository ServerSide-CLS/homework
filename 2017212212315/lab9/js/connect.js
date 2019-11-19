
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/user',{ useNewUrlParser: true,useUnifiedTopology: true });

var userSchema = mongoose.Schema({
	email:String,
	code:String,
	password:String
 });

 var Users=mongoose.model("user", userSchema);

 module.exports=Users;