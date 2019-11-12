let num = 6; // 一页显示的产品数
let products=[];  //产品数组
for(let i=1;i<37;i++){
    products.push({id:"Product "+i,src:"/images/"+i+".jpg"});
}
module.exports = function (req, res, next) {
    let page = req.query.page;  //获取当前在第几页
    if (!page) {
        page = 1
    }
    let show = [];
    for (let i = (page - 1) * num; i < products.length && i<page * num ; i++) {
        show.push(products[i]);
    }
    let max = Math.ceil(products.length / num);
    let pages = [];
    for (let i = 1; i <= max; i++) {
        pages.push(i)
    }
    req.pageData = {products: show, pages: pages, maxnum:max};
    next();
};