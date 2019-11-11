/*
生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use(’/’, routes); 加载
当访问主页时，就会调用res.render(‘index’, { title: ‘Express’ });渲染views/index.ejs模版并显示到浏览器中
*/    
//构造商品列表
function goodsList(pageSize,curPage){
    var arr = [];
    for (var i = 0; i < pageSize; i++){
        var good = {};
        var count = i + pageSize * (curPage - 1) + 1;
        good.title = "商品"+ count.toString();
        arr.push(good);
    }
    return arr;
}
// 构造分页数组    
function formatPag(pagData, curPage) {
    var arr = [];
    var total = pagData;
    var cur = parseInt(curPage);

    // 处理到上一页 < 的逻辑
    var pre = {};
    if(cur > 1)    pre.index = cur - 1;
    if(cur == 1)    pre.index="#";
    pre.text = '&lsaquo;';

    if (cur != 1) {
        pre.clickable = true;
    }

    arr.push(pre);

    // 处理到当前页前的逻辑
    for (var i = 1; i < cur; i++) {
        var pag = {};
        pag.text = i;
        pag.index = i;
        pag.clickable = true;
        arr.push(pag);
    }

    // 处理当前页
    var pag = {};
    pag.text = cur;
    pag.index = cur;
    pag.cur = true;
    arr.push(pag);

    for (var i = cur + 1; i <= total; i++) {
        var pag = {};
        pag.text = i;
        pag.index = i;
        pag.clickable = true;
        arr.push(pag);
    }
    // 处理到下一页的逻辑
    var next = {};
    if(cur < total){
        next.index = cur + 1;
    }
    if(cur == total)    next.index="#";
    next.text = '&rsaquo;';

    if (cur != total) {
        next.clickable = true;
    }
    
    arr.push(next);

    return arr;
}
module.exports = function(app) {
  //把名为home的视图加载到名为default的布局中
  app.get('/', (req, res) => {
      var pageSize = 5;
      var goodsCount = 20;
      var pageCount = goodsCount / pageSize;
      var curPage = req.query.page||2;
      var data = formatPag(pageCount,curPage);
      var goods = goodsList(pageSize,curPage);
      res.render('home',{goods:goods,data:data,title: "Express"});
  })
};