var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var designSchema = new Schema({
    email: String,
    lasttime: String,
    code: String
});

var designModel = mongoose.model("designer",designSchema);
module.exports = designModel;

