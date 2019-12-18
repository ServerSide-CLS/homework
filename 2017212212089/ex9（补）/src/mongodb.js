var mongoose = require("mongoose");
var config = require("../config");

mongoose.connect(config.mongoIp, { useNewUrlParser: true, useUnifiedTopology: true });

var personSchema = mongoose.Schema({
    email: String,
    password: String,
    code: String
})

var Person = mongoose.model("Person", personSchema);

module.exports = {
    Person
}