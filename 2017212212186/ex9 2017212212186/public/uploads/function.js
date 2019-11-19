var mongoose = require('../uploads/conn')

var userSchema = new mongoose.Schema({
    email:String,
    password:String,
});

module.exports = mongoose.model('user',userSchema)
