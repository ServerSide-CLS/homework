var express = require('express');
var router = express.Router();
let Mongo = require("./module/mongo");

var users = [];
Mongo.find(function (err, res) {
    users = res;
});

router.get('/', function (req, res) {
    res.render("admin", {
        user: users
    });
});
 module.exports = router;