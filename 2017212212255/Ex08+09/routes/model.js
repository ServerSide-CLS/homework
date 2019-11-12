var mongoose = require('./db.js');

// 模型骨架
var Schema = new mongoose.Schema({
    mail: {type: String},
    password: {type: String, default: '123456'}
});

// 由schema构造生成Model
var Model = mongoose.model('user',Schema);
 
module.exports = Model;