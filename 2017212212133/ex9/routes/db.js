
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_db');


var personSchema = mongoose.Schema({
   email: String,
   password: String
});
var Person = mongoose.model("Person", personSchema);