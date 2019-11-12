var express = require('express');
var router = express.Router();


let pageSize = 8;

let product = [
    {
        id: '1',
        name: '红富士苹果1',
        price: '22.8'
    }, {
        id: '2',
        name: '红富士苹果2',
        price: '22.8'
    }, {
        id: '3',
        name: '红富士苹果3',
        price: '22.8'
    }, {
        id: '4',
        name: '红富士苹果4',
        price: '22.8'
    }, {
        id: '5',
        name: '红富士苹果5',
        price: '22.8'
    }, {
        id: '6',
        name: '红富士苹果6',
        price: '22.8'
    }, {
        id: '7',
        name: '红富士苹果7',
        price: '22.8'
    }, {
        id: '8',
        name: '红富士苹果8',
        price: '22.8'
    }, {
        id: '9',
        name: '红富士苹果9',
        price: '22.8'
    }, {
        id: '10',
        name: '红富士苹果10',
        price: '22.8'
    }, {
        id: '11',
        name: '红富士苹果11',
        price: '22.8'
    }, {
        id: '12',
        name: '红富士苹果12',
        price: '22.8'
    }, {
        id: '13',
        name: '红富士苹果13',
        price: '22.8'
    }, {
        id: '14',
        name: '红富士苹果14',
        price: '22.8'
    }, {
        id: '15',
        name: '红富士苹果15',
        price: '22.8'
    }, {
        id: '16',
        name: '红富士苹果16',
        price: '22.8'
    }, {
        id: '17',
        name: '红富士苹果17',
        price: '22.8'
    }, {
        id: '18',
        name: '红富士苹果18',
        price: '22.8'
    }, {
        id: '19',
        name: '红富士苹果19',
        price: '22.8'
    }, {
        id: '20',
        name: '红富士苹果20',
        price: '22.8'
    }, {
        id: '21',
        name: '红富士苹果21',
        price: '22.8'
    }, {
        id: '22',
        name: '红富士苹果22',
        price: '22.8'
    }, {
        id: '23',
        name: '红富士苹果23',
        price: '22.8'
    }, {
        id: '24',
        name: '红富士苹果24',
        price: '22.8'
    }, {
        id: '25',
        name: '红富士苹果25',
        price: '22.8'
    }, {
        id: '26',
        name: '红富士苹果26',
        price: '22.8'
    }, {
        id: '27',
        name: '红富士苹果27',
        price: '22.8'
    }, {
        id: '28',
        name: '红富士苹果28',
        price: '22.8'
    }, {
        id: '29',
        name: '红富士苹果29',
        price: '22.8'
    }, {
        id: '30',
        name: '红富士苹果30',
        price: '22.8'
    }, {
        id: '31',
        name: '红富士苹果31',
        price: '22.8'
    }, {
        id: '32',
        name: '红富士苹果32',
        price: '22.8'
    }, {
        id: '33',
        name: '红富士苹果33',
        price: '22.8'
    }, {
        id: '34',
        name: '红富士苹果34',
        price: '22.8'
    }, {
        id: '35',
        name: '红富士苹果35',
        price: '22.8'
    }, {
        id: '36',
        name: '红富士苹果36',
        price: '22.8'
    }, {
        id: '37',
        name: '红富士苹果37',
        price: '22.8'
    }, {
        id: '38',
        name: '红富士苹果38',
        price: '22.8'
    }, {
        id: '39',
        name: '红富士苹果39',
        price: '22.8'
    }, {
        id: '40',
        name: '红富士苹果40',
        price: '22.8'
    }, {
        id: '41',
        name: '红富士苹果41',
        price: '22.8'
    }, {
        id: '42',
        name: '红富士苹果42',
        price: '22.8'
    },{
        id: '43',
        name: '红富士苹果43',
        price: '22.8'
    },{
        id: '44',
        name: '红富士苹果44',
        price: '22.8'
    },{
        id: '45',
        name: '红富士苹果45',
        price: '22.8'
    }
];

let pageCount = Math.ceil(product.length / pageSize);
let pageList = [];

for (var i = 0; i < pageCount; ++i){
    pageList[i] = {data: i + 1};
}

router.get('/', (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let productArr = product.slice(pageSize * (page - 1), pageSize * page);
    res.render('index', {layout: 'default', headMessage: '农产品列表', product: productArr, pageList: pageList, totalPage: pageCount, currentPage: page});
})

module.exports = router;
