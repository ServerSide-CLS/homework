var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var hbs = require('express-handlebars')
var app = express();

let ret=[
{"img":"/image/1.png","text":"1"},{"img":"/image/2.png","text":"2"},{"img":"/image/3.png","text":"3"},
{"img":"/image/4.png","text":"4"},{"img":"/image/5.png","text":"5"},{"img":"/image/6.png","text":"6"},
{"img":"/image/7.png","text":"7"},{"img":"/image/8.png","text":"8"},{"img":"/image/9.png","text":"9"},
{"img":"/image/10.png","text":"10"},{"img":"/image/11.png","text":"11"},{"img":"/image/12.png","text":"12"},
{"img":"/image/13.png","text":"13"},{"img":"/image/14.png","text":"14"},{"img":"/image/15.png","text":"15"},
{"img":"/image/16.png","text":"16"},{"img":"/image/17.png","text":"17"},{"img":"/image/18.png","text":"18"},
{"img":"/image/19.png","text":"19"},{"img":"/image/20.png","text":"20"},{"img":"/image/21.png","text":"21"},
{"img":"/image/22.png","text":"22"},{"img":"/image/23.png","text":"23"},{"img":"/image/24.png","text":"24"},
{"img":"/image/25.png","text":"25"},{"img":"/image/26.png","text":"26"},{"img":"/image/27.png","text":"27"},
{"img":"/image/28.png","text":"28"},{"img":"/image/29.png","text":"29"},{"img":"/image/30.png","text":"30"},
{"img":"/image/31.png","text":"31"},{"img":"/image/32.png","text":"32"},{"img":"/image/33.png","text":"33"},
{"img":"/image/34.png","text":"34"},{"img":"/image/35.png","text":"35"},{"img":"/image/36.png","text":"36"},
{"img":"/image/37.png","text":"37"},{"img":"/image/38.png","text":"38"}
]
let count=ret.length;
let pagesize=6;
let pageCount=count/pagesize;
let pageAllNum=7;
// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + 'public'));
app.use(express.static(path.join(__dirname, 'public')));

// 设置handlebars参数
app.engine( '.hbs', hbs( {
	extname: '.hbs',
	defaultLayout: 'default',
	layoutsDir:  __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));
app.get('/', (req, res) => {
	var nowpageNote=[];
	for(var i=0;i<6;i++){
		nowpageNote.push(ret[i]);
	}
	res.render('home', {
		layout: 'default', 
		params: 'm-home',
		cssfile:'/css/style.css',
		title:'supermarket',
		lastPage:1,
		nextPage:2,
		nowpageNote:nowpageNote
	});
})
app.get('/home', (req, res) => {
	var page=req.query.pageNum;
	var lastPage=page;
	var nextPage=page;
	var nowpageNote=[];
	var end;
	if(page==null){
		page=1;
	}
	if(parseInt(page)-1>0){
		lastPage=parseInt(lastPage)-1;
	}
	if(parseInt(page)+1<=pageAllNum){
		nextPage=parseInt(nextPage)+1;
	}
	if((page-1)*6+6>count){
		end=count;
	}
	else{
		end=(page-1)*6+6;
	}
	for(var i=6*(page-1);i<end;i++){
		nowpageNote.push(ret[i]);
	}
	res.render('home',{
		cssfile:'/css/style.css',
		page:page,
		title:'supermarket',
		lastPage:lastPage,
		nextPage:nextPage,
		nowpageNote:nowpageNote
	});
})
app.listen(3000);