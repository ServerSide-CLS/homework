var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,useUnifiedTopology: true });
var personinfoSchema = mongoose.Schema({
	name: String,
	realname:String,
	sex:String,
	birth:String,
	place:String,
	job:String,
	info:String
});
module.exports = mongoose.model('Personinfo', personinfoSchema);