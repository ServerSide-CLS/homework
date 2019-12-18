var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
  email: String,
  pwd: String,
});

module.exports = mongoose.model('user',userModel);
