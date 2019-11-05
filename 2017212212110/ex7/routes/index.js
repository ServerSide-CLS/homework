var express = require('express');
var router = express.Router();
var app = express();
const Handlebars = require('handlebars');

let product = [
    { "img": "images/1.jpg", "text": "爱玛（英，奥斯汀）" },
    { "img": "images/2.jpg", "text": "嘉莉妹妹（美，西奥多·德莱赛）" },
    { "img": "images/3.jpg", "text": "少年维特之烦恼（德，歌德）" },
    { "img": "images/4.jpg", "text": "罗亭·贵族之家（俄，屠格涅夫）" },
    { "img": "images/5.jpg", "text": "柏林，亚历山大广场（德，阿尔弗雷德·德布林）" },
    { "img": "images/6.jpg", "text": "细雪（日，谷崎润一郎）" },
    { "img": "images/7.jpg", "text": "漂亮朋友 （法，莫泊桑）" },
    { "img": "images/8.jpg", "text": "战地钟声（美，海明威）" },
    { "img": "images/9.jpg", "text": "啊，拓荒者（美，维拉·凯瑟）" },
    { "img": "images/10.jpg", "text": "黑郁金香（法，大仲马）" },
    { "img": "images/11.jpg", "text": "远大前程（英，查尔斯·狄更斯）" },
    { "img": "images/12.jpg", "text": "钢铁是怎样炼成的（苏，奥斯特洛夫斯基）" },
    { "img": "images/13.jpg", "text": "爱伦·坡短篇小说集（美，爱伦·坡）" },
    { "img": "images/14.jpg", "text": "莎士比亚四大悲剧（英，莎士比亚）" },
    { "img": "images/15.jpg", "text": "罪与罚（俄，陀思妥耶夫斯基）" },
    { "img": "images/16.jpg", "text": "莎士比亚喜剧集（英，莎士比亚）" },
    { "img": "images/17.jpg", "text": "了不起的盖茨比（美，菲茨杰拉德）" },
    { "img": "images/18.jpg", "text": "一封陌生女人的来信（奥，茨威格）" },
    { "img": "images/19.jpg", "text": "福尔摩斯探案集（英，柯南道尔）" },
    { "img": "images/20.jpg", "text": "我是猫（日，夏目漱石）" },
    { "img": "images/21.jpg", "text": "洛丽塔（美，弗拉基米尔·纳博科夫）" },
    { "img": "images/22.jpg", "text": "傲慢与偏见（英，奥斯汀）" },
    { "img": "images/23.jpg", "text": "胡桃夹子（霍夫曼）" },
    { "img": "images/24.jpg", "text": "地心游记（法，儒勒·凡尔纳）" },
    { "img": "images/25.jpg", "text": "海底两万里（法，儒勒·凡尔纳）" },
    { "img": "images/26.jpg", "text": "隐形人（英，乔治·威尔斯）" },
    { "img": "images/27.jpg", "text": "雾都孤儿（英，狄更斯）" },
    { "img": "images/28.jpg", "text": "汤姆·索亚历险记（美，马克·吐温）" },
    { "img": "images/29.jpg", "text": "野性的呼唤（美，杰克·伦敦）" },
    { "img": "images/30.jpg", "text": "海伦·凯勒传（美，海伦·凯勒）" },
    { "img": "images/31.jpg", "text": "白鲸（美，麦尔维尔）" },
    { "img": "images/32.jpg", "text": "汤姆叔叔的小屋（美，斯托夫人）" },
    { "img": "images/33.jpg", "text": "安徒生童话（丹麦，安徒生）" },
    { "img": "images/34.jpg", "text": "格林童话（格林兄弟）" },
    { "img": "images/35.jpg", "text": "简·爱（英，夏洛蒂·勃朗特）" },
    { "img": "images/36.jpg", "text": "悲惨世界（法，维克多·雨果）" },
    { "img": "images/37.jpg", "text": "飘（美，玛格丽特·米切尔）" },
    { "img": "images/38.jpg", "text": "红与黑（法，司汤达）" },
    { "img": "images/39.jpg", "text": "巴黎圣母院（法，维克多·雨果）" },
    { "img": "images/40.jpg", "text": "安妮日记（德，安妮·弗兰克）" },
];

// 设定页码各初始值
let count = product.length;
let pageSize = 8;
let pageCount = count/pageSize;
let pageNumber = 1;

app.get('/', (req, res) => {
  res.render('index', {
    layout: 'default', 
    params: 'm-home'
  });
});

/* GET index page. */
router.get('/', function(req, res, next) {
	let curPage = "/goodslist?pageNumber=1";
    let nextPage = "/goodslist?pageNumber=2";
    let result = [];
    for (let i = 0; i < 8; i++) {
        if (i > count) {
            break;
        }
        result.push(product[i]);
    }
    res.render('index',{
	    product: result,
	    curPage: curPage,
	    nextPage: nextPage,
	  });
});

/* GET page. */
router.get('/goodslist', function(req, res, next) {
	//保存当前页
	let curPage = "#pageNumber" + req.query.pageNumber;
	let preNumber = Number(req.query.pageNumber) - 1;
    let nextNumber = Number(req.query.pageNumber) + 1;
	//判断是否目前在第一页
    let preUrl = false;
    if (preNumber == 0) {
        preUrl = true;
    }
    //判断目前是否在最后一页
    let nextUrl = false;
    if (nextNumber == 8) {
        nextUrl = true;
    }
    let prePage = "/goodslist?pageNumber=" + preNumber.toString();
    let nextPage = "/goodslist?pageNumber=" + nextNumber.toString();

    //判断要从第几个数据开始读取
    let pageStart = (req.query.pageNumber - 1) * 8;
    let result = [];
    for (let i = pageStart; i <= pageStart + 7; i++) {
        if (i >= count) {
            break;
        }
        result.push(product[i]);
    }
    res.render('index', {
        product: result,
        preUrl: preUrl,
        nextUrl: nextUrl,
        prePage: prePage,
        nextPage: nextPage,
        curPage: curPage,
    });
});

module.exports = router;
