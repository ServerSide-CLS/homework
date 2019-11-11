const Mock = require("mockjs");
function createData(){
    let data = Mock.mock({
        "list|48":[
            {aaa:"hhh",bbb:"2019-11-1"}
        ]
    });
    return data;
}
module.exports = createData;