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
    var data = JSON.parse(process.env.localData);
    let dataList = data.records.filter((item, index) => {
        return (index >= (query.page - 1) * (query.limit)) && (index < (query.page) * (query.limit));
    })
    let pageCountTemp;
    (data.total) % 8 == 0 ? pageCountTemp = (data.total) / 8 : pageCountTemp = parseInt((data.total) / 8) + 1;
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
        total: data.total,
        pageCount: pageCount
    }
    // console.log(result)//debug
    return result;
}


module.exports = router;