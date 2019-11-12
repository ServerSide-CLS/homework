const express = require('express')
const ejs=require("ejs")
const fs=require("fs")

var app=express()

let count = product.length;
let pagesize = 8;
let pageCount = count / pagesize;
let pageNumber = 1;

router.get('/', function(req, res, next) {
    let curPage = "#page1";
    let nextPage = "/goodlist?pageNumber=2";
    let result = [];
    for (let i = 0; i < 8; i++) {
        if (i > count) {
            break;
        }
        result.push(product[i]);
    }
    res.render('index', {
        product: result,
        curPage: curPage,
        nextPage: nextPage,
    });
});

app.get('/goodlist', function(req, res) {

	var page_number = 7;
	var flags = new Array();
	for(var i = 1;i <= page_number;i++){
		flags[i] = false;
	}

	var page__ = req.query.pageNumber;
	if(page__ == null){
		page__ = 1;
	}

	var pre_pageNumber = page__;
	if(parseInt(page__) - 1 > 0){
		pre_pageNumber = parseInt(pre_pageNumber) - 1;
	}
	var nxt_pageNumber = page__;
	if(parseInt(page__) + 1 <= page_number){
		nxt_pageNumber = parseInt(nxt_pageNumber) + 1;
	}

    flags[page__] = true;
    
    res.render('layouts/goodlist', {
        layout: false,
        title: "首页",
        pageNumber: page__,
        pre_pageNumber:pre_pageNumber,
        nxt_pageNumber:nxt_pageNumber,
        pageCount: page_number,
        personInfoList: [
        	{
        		flag:flags[1],
            	images1: [
            		{
            			src:"../public/images/1.jpg"
            		},
            		{
            			src:"../public/images/2.jpg"
            		},
            		{
            			src:"../public/images/3.jpg"
            		},
            		{
            			src:"../public/images/4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"../public/images/5.jpg"
            		},
            		{
            			src:"../public/images/6.jpg"
            		},
            		{
            			src:"../public/images/7.jpg"
            		},
            		{
            			src:"../public/images/8.jpg"
            		}
            	]
        	},
			{
        		flag:flags[2],
            	images1: [
            		{
            			src:"../public/images/11.jpg"
            		},
            		{
            			src:"../public/images/12.jpg"
            		},
            		{
            			src:"../public/images/13.jpg"
            		},
            		{
            			src:"../public/images/14.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"../public/images/15.jpg"
            		},
            		{
            			src:"../public/images/16.jpg"
            		},
            		{
            			src:"../public/images/17.jpg"
            		},
            		{
            			src:"../public/images/18.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[3],
            	images1: [
            		{
            			src:"../public/images/21.jpg"
            		},
            		{
            			src:"../public/images/22.jpg"
            		},
            		{
            			src:"../public/images/23.jpg"
            		},
            		{
            			src:"../public/images/24.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"../public/images/25.jpg"
            		},
            		{
            			src:"../public/images/26.jpg"
            		},
            		{
            			src:"../public/images/27.jpg"
            		},
            		{
            			src:"../public/images/28.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[4],
            	images1: [
            		{
            			src:"../public/images/31.jpg"
            		},
            		{
            			src:"../public/images/32.jpg"
            		},
            		{
            			src:"../public/images/33.jpg"
            		},
            		{
            			src:"../public/images/34.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"../public/images/35.jpg"
            		},
            		{
            			src:"../public/images/36.jpg"
            		},
            		{
            			src:"../public/images/37.jpg"
            		},
            		{
            			src:"../public/images/38.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[5],
            	images1: [
            		{
            			src:"../public/images/41.jpg"
            		},
            		{
            			src:"../public/images/42.jpg"
            		},
            		{
            			src:"../public/images/43.jpg"
            		},
            		{
            			src:"../public/images/44.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"../public/images/45.jpg"
            		},
            		{
            			src:"../public/images/46.jpg"
            		},
            		{
            			src:"../public/images/47.jpg"
            		},
            		{
            			src:"../public/images/48.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[6],
            	images1: [
            		{
            			src:"../public/images/51.jpg"
            		},
            		{
            			src:"../public/images/52.jpg"
            		},
            		{
            			src:"../public/images/53.jpg"
            		},
            		{
            			src:"../public/images/54.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"../public/images/55.jpg"
            		},
            		{
            			src:"../public/images/56.jpg"
            		},
            		{
            			src:"../public/images/57.jpg"
            		},
            		{
            			src:"../public/images/58.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[7],
            	images1: [
            		{
            			src:"../public/images/61.jpg"
            		},
            		{
            			src:"../public/images/62.jpg"
            		},
            		{
            			src:"../public/images/63.jpg"
            		},
            		{
            			src:"../public/images/64.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"../public/images/65.jpg"
            		},
            		{
            			src:"../public/images/66.jpg"
            		},
            		{
            			src:"../public/images/67.jpg"
            		},
            		{
            			src:"../public/images/68.jpg"
            		}
            	]
        	}
        ]
    });
});