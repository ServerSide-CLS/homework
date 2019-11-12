var express = require('express');
var app = express();
var hbs = require('express-handlebars');

//设置模板引擎
app.set('view engine','hbs');
//设置静态资源目录
app.set('views',__dirname + '/views');

//设置handlebars参数
app.engine('.hbs',hbs({
	extname:'.hbs',
	defaultLayout:'default',
	layoutsDir:__dirname + '/views/layouts/',
	partialsDir:__dirname + '/views/partials/'
}));


//定义变量
var img1 = new Array();
var img2 = new Array();//图片名数组
var page = new Array();//页数数组
var left = 1;
var right = 3;

img1 = [1,2,3,4];
img2 = [5,6,7,8];

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/css'));

app.get('/',(req,res) =>{
	res.render('page',{layout:'default',title:'m-page',page:["1","2","3"],left:left,right:right,img1:img1,img2:img2});
});

app.get('/:id',(req,res) =>{
	for(var i = 0;i<4;i++){
		img1[i] = i+1+(req.params.id-1)*8;
		img2[i] = i+5+(req.params.id-1)*8;
	}
	if(parseInt(req.params.id)>2){
		img1 = [17];
		img2 = [];
	}
	if(req.params.id>1)
		left = parseInt(req.params.id)-1;
	if(req.params.id<3)
		right = parseInt(req.params.id)+1;
	res.render('page',{layout:'default',title:'m-page',page:["1","2","3"],left:left,right:right,img1:img1,img2:img2});
});

app.listen(3000);