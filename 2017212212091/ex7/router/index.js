var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
    let query = {
        page: 1,
        limit: 8
    };
    if (req.query && Object.keys(req.query).length != 0) {
        query = req.query;
    }
    res.render("index", { layout: 'default', list: getData(query) });
})



/**
 * 数据分页
 * @param {Object} query 分页相关参数(page,limit) 
 */
function getData(query) {
    let dataLists = [
        {
            id:1,
            title:'test1',
            content:'1111111111'
        },{
            id:2,
            title:'test2',
            content:'2222222222'
        },{
            id:3,
            title:'test3',
            content:'333333333'
        },{
            id:4,
            title:'test4',
            content:'444444444'
        },{
            id:5,
            title:'test5',
            content:'555555555'
        },{
            id:6,
            title:'test6',
            content:'666666666'
        },{
            id:7,
            title:'test7',
            content:'777777777'
        },{
            id:1,
            title:'test1',
            content:'111111111'
        },{
            id:2,
            title:'test2',
            content:'2222222222'
        },{
            id:3,
            title:'test3',
            content:'333333333'
        },{
            id:4,
            title:'test4',
            content:'444444444'
        },{
            id:5,
            title:'test5',
            content:'555555555'
        },{
            id:6,
            title:'test6',
            content:'666666666'
        },{
            id:7,
            title:'test7',
            content:'777777777'
        },{
            id:1,
            title:'test1',
            content:'111111111'
        },{
            id:2,
            title:'test2',
            content:'2222222222'
        },{
            id:3,
            title:'test3',
            content:'333333333'
        },{
            id:4,
            title:'test4',
            content:'444444444'
        },{
            id:5,
            title:'test5',
            content:'555555555'
        },{
            id:6,
            title:'test6',
            content:'66666666'
        },{
            id:7,
            title:'test7',
            content:'77777777'
        }
    ]
    var dataTotal = dataLists.length;
    let dataList = dataLists.filter((item, index) => {
        return (index >= (query.page - 1) * (query.limit)) && (index < (query.page) * (query.limit));
    })
    let pageCountTemp;
    (dataTotal) % 8 == 0 ? pageCountTemp = (dataTotal) / 8 : pageCountTemp = parseInt((dataTotal) / 8) + 1;
    let pageCount = [];
    for (let i = 1; i <= pageCountTemp; i++) {
        if (i == query.page) {
            pageCount.push({ page: i, isactive: true });
        } else {
            pageCount.push({ page: i, isactive: false });
        }
    }
    var result = {
        records: dataList,
        total: dataTotal,
        pageCount: pageCount
    }
    // console.log(result)//debug
    return result;
}


module.exports = router;