var express = require('express');
var router = express.Router();


let all = [
		{
			"send":"Apple",
			"title":"<广告>AirPods Pro 来了。",
			"time":"2019/10/31"
		},
		{
			"send":"Codeforces",
			"title":"Codeforces Round 596 (based on Technocup 2020 - Elimination Round 2)",
			"time":"2019/10/30"
		},
		{
			"send":"Codeforces",
			"title":"Codeforces Round 595 (based on Technocup 2021 - Elimination Round 2)",
			"time":"2019/10/29"
		},
		{
			"send":"Codeforces",
			"title":"Codeforces Round 500 (based on Technocup 2000 - Elimination Round 2)",
			"time":"2019/10/15"
		},
		{
			"send":"Windows",
			"title":"欢迎使用Windows 10",
			"time":"2019/9/30"
		},
		{
			"send":"a",
			"title":"aaa",
			"time":"2018/10/31"
		},
		{
			"send":"b",
			"title":"bbb",
			"time":"2018/1/31"
		},
		{
			"send":"c",
			"title":"ccc",
			"time":"2017/8/2"
		},
		{
			"send":"d",
			"title":"ddd",
			"time":"2017/7/21"
		},
		{
			"send":"e",
			"title":"eee",
			"time":"2016/6/25"
		}
	];



/* GET home page. */
router.get('/', function(req, res, next) {
	let result = [];
	let count = all.length
	let pagesize = 6
	let pageCount = Math.ceil(count / pagesize)
    let pageNumber = parseInt(req.query.page) || 1
    for (var i = (pageNumber-1)*pagesize; i < pageNumber * pagesize; i++) {
        	if (i >= count) {
            	break;
        	}
        	result.push(all[i]);
    }
	let lastPage = pageNumber > 1 ? pageNumber-1 : 1
	let nextPage = pageNumber < pageCount ? pageNumber+1 : pageCount
	

  	res.render('index', { 
	  	layout:"default" ,
	  	title: 'Express' ,
	  	all:result,
	  	prePage: lastPage,
        nextPage: nextPage
	  });

});


module.exports = router;
