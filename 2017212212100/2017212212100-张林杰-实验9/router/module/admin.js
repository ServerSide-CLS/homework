var express = require("express");
var router = express.Router();
var Mongo = require("../../src/mongo");



/**
 * 获取用户数据
 */
function getData(callback) {
    Mongo.Person.find((err, res) => {
        let result = {};
        if (err) {
            result.code = true;
            result.err = err.toString();
        }
        console.log(res)
        result.code = false;
        result.records = res;
        callback(result)
    })
}




/**
 * 展现所有用户信息路由
 */
router.get("/admin", (req, res) => {
    getData(function(back){
        res.render("admin", { layout: "default", result: back })
    })
})





module.exports = router;