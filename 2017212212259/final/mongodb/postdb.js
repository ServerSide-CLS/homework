var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,useUnifiedTopology: true });
var postSchema=mongoose.Schema({
	title:String,
	part:String,
	time:String,
	aticles:String,
	Pfile:String,
	look_count:Number,
	good_count:Number,
	author:String
});
module.exports =mongoose.model("postTip",postSchema);