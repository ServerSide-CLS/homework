var mongoose = require('./db.js');

var Schema = new mongoose.Schema({
    Email: {type: String},
    password: {type: String}
});
// 由schema构造生成Model
var Model = mongoose.model('user',Schema);
 
module.exports = Model;
