var express = require('express');
var jade =require('jade');
var router = express.Router();
var pageNum = 5;
var pageMax = 8;

//生成货物
let data = [];
for(var i=1; i<=pageNum*pageMax; i++){
	data.push("goods"+i);
}

router.get('/', function(req, res, next) {
    let lastNo = Number(req.query.pageNo) - 1;
    let nextNo = Number(req.query.pageNo) + 1;

    let lastPage = "#";
    let nextPage = "#";
    lastPage = lastNo.toString() > 0 ? "/?pageNo="+lastNo.toString() : "#" ;
    nextPage = nextNo.toString() < pageNum.toString() ? "/?pageNo="+nextNo.toString() : "#";

    let first = (req.query.pageNo - 1) * pageMax;
    let goods = [];
    for (let i = first; i <= first + (pageMax - 1); i++) {
        goods.push(data[i]);
    }

    res.render('layout.jade', {
        lastPage: lastPage,
        nextPage: nextPage,
        goods: goods
    });
});


module.exports = router;
