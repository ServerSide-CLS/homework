var Mock = require("mockjs");

const generateData = function () {
    let data = {};
    data = Mock.mock({
        'records|6-80': [{
            "title": "这是个标题",
            "content": "@sentence(5)"
        }]
    })
    data.total = data.records.length;
    return data;
}


module.exports = {
    generateData
}