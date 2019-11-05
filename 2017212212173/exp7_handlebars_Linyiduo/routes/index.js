const express = require('express');
const bookdata = require('../utils/bookData');
const router = express.Router();

router.get('/', function(req, res, next) {
    let pageNow = req.query.pageNow ? req.query.pageNow : 1;

    let totalPointer = 1;
    let list = new Array();
    let temp = new Array();
    
    for (let i = 0; i < bookdata.books.length; i++) {
        if ((totalPointer) % 9 != 0){
            temp.push(bookdata.books[totalPointer-1]);
        }
        else {
            list.push(temp);
            temp = new Array();
        }
        totalPointer++;
    }
    let pagesNum = list.length;

    res.render('content', {
        pageNow, 
        pagesNum, 
        book: list[pageNow - 1]}
    );
});

module.exports = router; 