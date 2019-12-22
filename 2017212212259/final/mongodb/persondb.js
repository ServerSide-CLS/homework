var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,useUnifiedTopology: true });
var personSchema = mongoose.Schema({
	name: String,
	pwd: String,
	email:String,
	headPic:String
});
module.exports = mongoose.model('Person', personSchema);