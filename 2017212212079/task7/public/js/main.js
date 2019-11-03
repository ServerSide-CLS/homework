const Mock = require("mockjs");
function createData(){
    let data = Mock.mock({
        "list|10-40":[
            {name:"item",cTime:"2019-11-1"}
        ]
    });
    return data;
}
module.exports = createData;
