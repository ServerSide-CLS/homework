var express = require('express');
var router = express.Router();

let project = [
    {
        id: '1',
        name: '商品1',
        type: 1
    }, {
        id: '2',
        name: '商品2',
        type: 2
    }, {
        id: '3',
        name: '商品3',
        type: 3
    }, {
        id: '4',
        name: '商品4',
        type: 4
    }, {
        id: '5',
        name: '商品5',
        type: 5
    }, {
        id: '6',
        name: '商品6',
        type: 6
    }, {
        id: '7',
        name: '商品7',
        type: 7
    }, {
        id: '8',
        name: '商品8',
        type: 8
    }, {
        id: '9',
        name: '商品9',
        type: 9
    }, {
        id: '10',
        name: '商品10',
        type: 10
    }, {
        id: '11',
        name: '商品11',
        type: 11
    }, {
        id: '12',
        name: '商品12',
        type: 12
    }, {
        id: '13',
        name: '商品13',
        type: 13
    }, {
        id: '14',
        name: '商品14',
        type: 14
    }, {
        id: '15',
        name: '商品15',
        type: 15
    }, {
        id: '16',
        name: '商品16',
        type: 16
    }, {
        id: '17',
        name: '商品17',
        type: 17
    }, {
        id: '18',
        name: '商品18',
        type: 18
    }, {
        id: '19',
        name: '商品19',
        type: 19
    }, {
        id: '20',
        name: '商品20',
        type: 20
    }, {
        id: '21',
        name: '商品21',
        type: 21
    }, {
        id: '22',
        name: '商品22',
        type: 22
    }, {
        id: '23',
        name: '商品23',
        type: 23
    }, {
        id: '24',
        name: '商品24',
        type: 24
    }, {
        id: '25',
        name: '商品25',
        type: 25
    }, {
        id: '26',
        name: '商品26',
        type: 26
    }, {
        id: '27',
        name: '商品27',
        type: 27
    }, {
        id: '28',
        name: '商品28',
        type: 28
    }, {
        id: '29',
        name: '商品29',
        type: 29
    }, {
        id: '30',
        name: '商品30',
        type: 30
    }, {
        id: '31',
        name: '商品31',
        type: 31
    }, {
        id: '32',
        name: '商品32',
        type: 32
    }, {
        id: '33',
        name: '商品33',
        type: 33
    }, {
        id: '34',
        name: '商品34',
        type: 34
    }, {
        id: '35',
        name: '商品35',
        type: 35
    }, {
        id: '36',
        name: '商品36',
        type: 36
    }, {
        id: '37',
        name: '商品37',
        type: 37
    }, {
        id: '38',
        name: '商品38',
        type: 38
    }, {
        id: '39',
        name: '商品39',
        type: 39
    }, {
        id: '40',
        name: '商品40',
        type: 40
    }, {
        id: '41',
        name: '商品41',
        type: 41
    }, {
        id: '42',
        name: '商品42',
        type: 42
    },
];
let pageSize = 6;
let pageCnt = project.length / pageSize;
let pageList = [];

function getPageList() {
    pageList = [];
    for (let i = 1; i <= pageCnt; ++i) {
        pageList.push({data: i});
    }
}

/* GET home page. */
router.get('/index', function (req, res, next) {
    let currentPage = parseInt(req.query.pageNumber) || 1;
    let offset = (currentPage - 1) * pageSize;
    let newArr = project.slice(offset, offset + pageSize);
    getPageList();
    res.render('index', {pageCount: pageCnt, pageNumber: currentPage, count: pageSize, entity: newArr, pageList:pageList});
});

module.exports = router;
