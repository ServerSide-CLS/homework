var express = require('express');
var router = express.Router();
var app = express();
const Handlebars = require('handlebars')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);

//数据
let product = [
    { "img": "images/1.jpg", "text": "意大利风景" },
    { "img": "images/2.jpg", "text": "傍晚海边风景" },
    { "img": "images/3.jpg", "text": "草地风景" },
    { "img": "images/4.jpg", "text": "夕阳风景" },
    { "img": "images/5.jpg", "text": "河流风景" },
    { "img": "images/6.jpg", "text": "新西兰风景" },
    { "img": "images/7.jpg", "text": "马尔代夫风景" },
    { "img": "images/8.jpg", "text": "日出风景" },
    { "img": "images/9.jpeg", "text": "雪山风景" },
    { "img": "images/10.jpg", "text": "田园风景" },
    
];

//let count = Object.keys(product).length;
let count = product.length;
let pagesize = 8;
let pageCount = count / pagesize;
let pageNumber = 1;

/* GET index page. */
router.get('/', function(req, res, next) {
    let curPage = "#page1";
    let nextPage = "/goodlist?pageNumber=2";
    let result = [];
    for (let i = 0; i < 8; i++) {
        if (i > count) {
            break;
        }
        result.push(product[i]);
    }
    res.render('index', {
        product: result,
        curPage: curPage,
        nextPage: nextPage,
    });
});

/* GET pageNumber page. */
router.get('/goodlist', function(req, res, next) {
    //保存当前在第几页，用于修改当前页面的a标签css
    let curPage = "#page" + req.query.pageNumber;

    let preNumber = Number(req.query.pageNumber) - 1;
    let nextNumber = Number(req.query.pageNumber) + 1;
    //判断是否目前在第一页
    let preUrl = false;
    if (preNumber == 0) {
        preUrl = true;
    }
    //判断目前是否在最后一页
    let nextUrl = false;
    if (nextNumber == 8) {
        nextUrl = true;
    }
    let prePage = "/goodlist?pageNumber=" + preNumber.toString();
    let nextPage = "/goodlist?pageNumber=" + nextNumber.toString();

    //判断要从第几个数据开始读取
    let pageStart = (req.query.pageNumber - 1) * 8;
    let result = [];
    for (let i = pageStart; i <= pageStart + 7; i++) {
        //如果最后一页的值没有8个，则不需要输出8个，跳出循环
        if (i >= count) {
            break;
        }
        result.push(product[i]);
    }
    res.render('index', {
        product: result,
        preUrl: preUrl,
        nextUrl: nextUrl,
        prePage: prePage,
        nextPage: nextPage,
        curPage: curPage,
    });
});

app.get('/', (req, res) => {
    res.render('home', { layout: 'default', params: 'm-home' });
})

module.exports = router;