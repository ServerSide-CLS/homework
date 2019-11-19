const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: String,
  pwd: String,
}, { versionKey: false });

/**
 * Methods: add to document (newUser.addUser())
 */
userSchema.methods.addUser = function () {
  var greeting = this.name ? `已添加用户 ${this.name}` : "I don't have a name?";
  console.log(greeting);
}

/**
 * Statics: add to model (User.whatThis())
 */
// or `userSchema.static('whatThis', function() {})`
userSchema.statics.whatThis = function () {
  console.log(this)
}

// Model creation
module.exports = mongoose.model('User', userSchema);
