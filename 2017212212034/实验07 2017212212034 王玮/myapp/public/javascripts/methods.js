const fs = require('fs');

function getGoodList() {
    let data = fs.readFileSync('goods.txt','utf-8');
    let goodList = [];
    let goods = data.toString().split(',');
    for(let i = 0; i < goods.length; i += 4) {
        let obj = new Object();
        obj.goodImg = goods[i];
        obj.goodName = goods[i + 1];
        obj.goodPrice = goods[i + 2];
        obj.goodId = goods[i + 3];
        goodList.push(obj);
    }
    return goodList; 
}

function getGoodListByPage(page = 1, pageSize = 9) {
    let goodList = getGoodList();
    let recordTotal = goodList.length;
    let data = [];
    for(let i = (page - 1) * pageSize; i < parseInt(((page - 1) * pageSize) + parseInt(pageSize)); i++) {
        if(i >= recordTotal)
            break;
        data.push(goodList[i]);
    }
    let pageTotal = Math.ceil(recordTotal/pageSize);
    let pageCollect = [];
    let previous = page == 1? page = 1 : parseInt(page) - 1;
    let next = page == pageTotal? page = pageTotal : parseInt(page) + 1;
    for(let i = 1;i <= pageTotal;i ++){
        if(i == page) {
            pageCollect.push({page: i, isactive: true});
        } else {
            pageCollect.push({page: i, isactive: false});
        }
    }
    return {
        previous: previous,
        next: next,
        currentPage:page,
        total: pageTotal,
        records: data,
        pageCollect: pageCollect
    }
}

module.exports = {
    getGoodList,
    getGoodListByPage
}