const Mock = require("mockjs");
function createData(){
    let data = Mock.mock({
        "list|30":[
            {name:"item",cTime:"2019-11-5"}
        ]
    });
    return data;
}
module.exports = createData;
