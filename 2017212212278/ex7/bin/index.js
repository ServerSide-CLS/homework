var express = require('express');
let data=[]
let size = 6;
for(let i=1;i<28;i++){
    data.push({name:i})
}
function fun(req, res, next) {
    // 页数
    let flag = 0;
    let pages = [];
    let spare = [];
    let pagesize = req.query.page;
    if (pagesize==null) {
        pagesize = 1;
    }
    for (let i = (pagesize - 1) * size; i < data.length; i++) {
        spare.push(data[i]);
        if (i == pagesize * size - 1) {
            break;
        }
    }
    let num = Math.ceil(data.length / size);
    for (let i = 1; i <= num; i++) {
        pages.push(i)
    }
    let pageData={data: spare, num: pages,maxpage:num};
    req.pageData = pageData;
    next();
}
module.exports = fun;
