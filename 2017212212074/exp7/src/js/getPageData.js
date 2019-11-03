//一页的产品数量
let pagesize = 12;
//产品数据
let data=[]
for(let i=1;i<68;i++){
    data.push({name:i})
}
module.exports = function (req, res, next) {
    // 获取页数参数
    let page = req.query.page;
    // 如果没有页数参数默认为1
    if (!page) {
        page = 1
    }
    // 根据当前页数得到相应的产品数据
    let showdata = []
    for (let i = (page - 1) * pagesize; i < data.length; i++) {
        showdata.push(data[i]);
        if (i == page * pagesize - 1) {
            break;
        }
    }
    //获得最大页数
    let pagenum = Math.ceil(data.length / pagesize);
    //生成页数数组
    let pages = []
    for (let i = 1; i <= pagenum; i++) {
        pages.push(i)
    }
    let pageData={data: showdata, pagenum: pages,maxpage:pagenum}
    // 将数据存放到req对象中
    req.pageData = pageData;
    next();
}