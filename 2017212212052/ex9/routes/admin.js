

var express = require('express');
var router = express.Router();
let Mongo = require("./module/mongo");

function getData(call) {
    Mongo.user.find((err, res) => {
        let result = {};
        if (err) {
            result.code = true;
            result.err = err.toString();
        }
        console.log(res);
        result.code = false;
        result.data = res;
        call(result);
    })
}

/* GET home page. */
router.get('/', function (req, res, next) {
    getData(function (back) {
        console.log(back);
        res.render('admin', {response: back});
    })
});

module.exports = router;