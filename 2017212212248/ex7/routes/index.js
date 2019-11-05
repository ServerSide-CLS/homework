var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let page = 1;
    let pagePre = 1;
    let pageNext = 1;
    //默认页面为第一页

    if(req.query != null) {
        page = req.query.page;
        //请求中传回的页数
        if (page != 1)
            pagePre = page - 1;
        //前一页页码
        if (page != 7)
            pageNext = Number(page) + 1;
        //后一页页码
    }

    res.render('index', {
        pageAll:[1,2,3,4,5,6,7],    //此处固定为7页
        page:page,                  //返回当前页
        data:getInfo(page),         //通过getInfo函数处理
        pagePre:pagePre,            //返回前一页页码
        pageNext:pageNext           //返回后一页页码
    })
})

function getInfo(page){
    let info = [
        {"name":"giraffe","cost":"12","image":"/images/image1.png"},
        {"name":"tiger","cost":"23","image":"/images/image2.png"},
        {"name":"panda","cost":"34","image":"/images/image3.png"},
        {"name":"unicorn","cost":"45","image":"/images/image4.png"},

        {"name":"FF","cost":"32","image":"/images/image4.png"},
        {"name":"AA","cost":"23","image":"/images/image3.png"},
        {"name":"BB","cost":"141","image":"/images/image2.png"},
        {"name":"CC","cost":"435","image":"/images/image1.png"},

        {"name":"DD","cost":"65","image":"/images/image1.png"},
        {"name":"EE","cost":"78","image":"/images/image3.png"},
        {"name":"FF","cost":"89","image":"/images/image2.png"},
        {"name":"OO","cost":"32","image":"/images/image4.png"},

        {"name":"FF","cost":"32","image":"/images/image4.png"},
        {"name":"AA","cost":"23","image":"/images/image3.png"},
        {"name":"BB","cost":"141","image":"/images/image2.png"},
        {"name":"CC","cost":"435","image":"/images/image1.png"},

        {"name":"DD","cost":"65","image":"/images/image1.png"},
        {"name":"EE","cost":"78","image":"/images/image3.png"},
        {"name":"FF","cost":"89","image":"/images/image2.png"},
        {"name":"OO","cost":"32","image":"/images/image4.png"},

        {"name":"giraffe","cost":"12","image":"/images/image1.png"},
        {"name":"tiger","cost":"23","image":"/images/image2.png"},
        {"name":"panda","cost":"34","image":"/images/image3.png"},
        {"name":"unicorn","cost":"45","image":"/images/image4.png"},

        {"name":"giraffe","cost":"12","image":"/images/image1.png"},
        {"name":"tiger","cost":"23","image":"/images/image2.png"},
        {"name":"panda","cost":"34","image":"/images/image3.png"},
        {"name":"unicorn","cost":"45","image":"/images/image4.png"},

        {"name":"FF","cost":"32","image":"/images/image3.png"},
        {"name":"AA","cost":"23","image":"/images/image3.png"},
        {"name":"BB","cost":"141","image":"/images/image4.png"},
        {"name":"CC","cost":"435","image":"/images/image1.png"},

        {"name":"giraffe","cost":"12","image":"/images/image1.png"},
        {"name":"tiger","cost":"23","image":"/images/image2.png"},
        {"name":"panda","cost":"34","image":"/images/image2.png"},
        {"name":"unicorn","cost":"45","image":"/images/image4.png"},

        {"name":"FF","cost":"32","image":"/images/image4.png"},
        {"name":"AA","cost":"23","image":"/images/image2.png"},
        {"name":"BB","cost":"141","image":"/images/image2.png"},
        {"name":"CC","cost":"435","image":"/images/image1.png"},

        {"name":"giraffe","cost":"12","image":"/images/image1.png"},
        {"name":"tiger","cost":"23","image":"/images/image2.png"},
        {"name":"panda","cost":"34","image":"/images/image3.png"},
        {"name":"unicorn","cost":"45","image":"/images/image4.png"},

        {"name":"FF","cost":"32","image":"/images/image4.png"},
        {"name":"AA","cost":"23","image":"/images/image3.png"},
        {"name":"BB","cost":"141","image":"/images/image2.png"},
        {"name":"CC","cost":"435","image":"/images/image1.png"},

        {"name":"giraffe","cost":"12","image":"/images/image1.png"},
        {"name":"tiger","cost":"23","image":"/images/image2.png"},
        {"name":"panda","cost":"34","image":"/images/image3.png"},
        {"name":"unicorn","cost":"45","image":"/images/image4.png"},


    ];
    //页面数据
    let data = null;
    if(page == null)
        data = info.slice(0,8);
    //第一页默认为前八条数据
    else
        data = info.slice((page-1)*8,page*8);
    //把数据按照每页八个进行划分

    let result = data;
    return result;
    //返回数据
}

module.exports = router;
