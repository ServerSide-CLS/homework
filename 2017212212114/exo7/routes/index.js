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
    { "img": "images/1.jpg", "text": "茅台（MOUTAI）43度飞天茅台酒" },
    { "img": "images/2.jpg", "text": "粱纯粮食高度原浆怀郎老酒" },
    { "img": "images/3.jpg", "text": "洋河蓝色经典 海之蓝" },
    { "img": "images/4.jpg", "text": "牛栏山 白酒" },
    { "img": "images/5.jpg", "text": "卡摩莫斯卡托低醇高泡型" },
    { "img": "images/6.jpg", "text": "汾酒 白酒 黄盖玻汾" },
    { "img": "images/7.jpg", "text": "法国原瓶原装进口红酒礼盒装" },
    { "img": "images/8.jpg", "text": "红星 白酒 蓝瓶二锅头" },
    { "img": "images/9.jpg", "text": "杰克丹尼（Jack Daniel's" },
    { "img": "images/10.jpg", "text": "盼盼 清凉饮品" },
    { "img": "images/11.jpg", "text": "维他奶 维他柠檬茶饮料" },
    { "img": "images/12.jpg", "text": "可口可乐" },
    { "img": "images/13.jpg", "text": "康师傅冰红茶" },
    { "img": "images/14.jpg", "text": "椰树 椰汁正宗椰树牌椰子汁" },
    { "img": "images/15.jpg", "text": "达利园" },
    { "img": "images/16.jpg", "text": "娃哈哈" },
    { "img": "images/17.jpg", "text": "荔枝汽水" },
    { "img": "images/18.jpg", "text": "维他奶 原味豆奶植物蛋白饮料" },
    { "img": "images/19.jpg", "text": "真果粒" },
    { "img": "images/20.jpg", "text": "美汁源" },
    { "img": "images/21.jpg", "text": "百事可乐无糖" },
    { "img": "images/22.jpg", "text": "脉动 水蜜桃" },
    { "img": "images/23.jpg", "text": "三得利（Suntory） 无糖乌" },
    { "img": "images/24.jpg", "text": "蒙牛特仑苏" },
    { "img": "images/25.jpg", "text": "农夫山泉" },
    { "img": "images/26.jpg", "text": "旺仔牛奶" },
    { "img": "images/27.jpg", "text": "地中海塞浦路斯进口" },
    { "img": "images/28.jpg", "text": "维他奶 维他柠檬茶饮料" },
    { "img": "images/29.jpg", "text": "东鹏特饮" },
    { "img": "images/30.jpg", "text": "NFC果汁饮料" },
    { "img": "images/31.jpg", "text": "豆本豆 唯甄豆奶" },
    { "img": "images/32.jpg", "text": "健力宝经典纪念罐运动饮料" },
    { "img": "images/33.jpg", "text": "依能 GUO 芒果+百香果" },
    { "img": "images/34.jpg", "text": "元気森林 元气森林无糖气泡" },
    { "img": "images/35.jpg", "text": "养元六个核桃易智优" },
    { "img": "images/36.jpg", "text": "奥地利原装进口 红牛" },
    { "img": "images/37.jpg", "text": "雀巢（Nestle）咖啡" },
    { "img": "images/38.jpg", "text": "蒙牛 纯甄小蛮腰 高端轻酪" },
    { "img": "images/39.jpg", "text": "盼盼 清凉饮品 酸梅汤" },
    { "img": "images/40.jpg", "text": "伊利 优酸乳" },
    { "img": "images/41.jpg", "text": "麦斯威尔 特浓速溶咖啡" },
    { "img": "images/42.jpg", "text": "太古（taikoo ）咖啡方糖" },
    { "img": "images/43.jpg", "text": "蒙牛 【肖战同款】真果粒" },
    { "img": "images/44.jpg", "text": "伊利 舒化无乳糖牛奶" },
    { "img": "images/45.jpg", "text": "依能 加锌 无糖无汽弱碱" },
    { "img": "images/46.jpg", "text": "维他奶 巧克力味豆奶植物" },
    { "img": "images/47.jpg", "text": "屈臣氏（Watsons）盐味" },
    { "img": "images/48.jpg", "text": "香飘飘奶茶" },
    { "img": "images/49.jpg", "text": "韩国进口 宾格瑞" },
    { "img": "images/50.jpg", "text": "东鹏饮料新品 冬瓜汁" },
    { "img": "images/51.jpg", "text": "必乐（betale）液态练后餐" },
    { "img": "images/52.jpg", "text": "加多宝 凉茶植物饮料" },
    { "img": "images/53.jpg", "text": "吾尚 益菌多原味" },
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

// let product = {
//     product0: { "id": 0, "img": "images/1.jpg", "text": "茶具1" },
//     product1: { "id": 1, "img": "images/2.jpg", "text": "茶具2" },
//     product2: { "id": 2, "img": "images/2.jpg", "text": "茶具3" },
//     product3: { "id": 3, "img": "images/3.jpg", "text": "茶具4" },
//     product4: { "id": 4, "img": "images/4.jpg", "text": "茶具5" },
//     product5: { "id": 5, "img": "images/5.jpg", "text": "茶具6" },
//     product6: { "id": 6, "img": "images/6.jpg", "text": "茶具7" },
//     product7: { "id": 7, "img": "images/7.jpg", "text": "茶具8" },
//     product8: { "id": 8, "img": "images/8.jpg", "text": "茶具9" },
//     product9: { "id": 1, "img": "images/1.jpg", "text": "茶具10" },
//     product10: { "id": 2, "img": "images/2.jpg", "text": "茶具2" },
//     product11: { "id": 3, "img": "images/3.jpg", "text": "茶具3" },
//     product12: { "id": 4, "img": "images/4.jpg", "text": "茶具4" },
//     product13: { "id": 5, "img": "images/5.jpg", "text": "茶具5" },
//     product14: { "id": 6, "img": "images/6.jpg", "text": "茶具6" },
//     product15: { "id": 7, "img": "images/7.jpg", "text": "茶具7" },
//     product16: { "id": 8, "img": "images/8.jpg", "text": "茶具8" },
// };

// Handlebars.registerHelper('page', function(curPage) {
//     //let curPage = 1;
//     let preUrl;
//     if (curPage == 1) {
//         preUrl = '#';
//     } else {
//         preUrl = '1';
//     }
//     let prePage = "<li><a href=" + preUrl + "><<</a></li>";

//     let middlePage = "";
//     for (var i = 1; i <= count; i++) {
//         middlePage += "<li><a href=" + i + ">" + i + "</a></li>";
//     }

//     let nextUrl;
//     if (curPage == product.length) {
//         nextUrl = '#';
//     } else {
//         nextUrl = curPage + 1;
//     }
//     let nextPage = "<li><a href=" + nextUrl + ">>></a></li>";

//     let allPage = prePage + middlePage + nextPage;
//     return new Handlebars.SafeString(allPage);
// });