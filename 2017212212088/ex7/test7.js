var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
	var page_number = 7;
    res.render('goodlist', {
        layout: false,
        title: "首页",
        css_href: "/static/goodlist.css",
        pageNumber: 1,
        pre_pageNumber:1,
        nxt_pageNumber:2,
        pageCount: page_number,
        personInfoList: [
        	{
        		flag:true,
            	images1: [
            		{
            			src:"/static/image/1-1.jpg"
            		},
            		{
            			src:"/static/image/1-2.jpg"
            		},
            		{
            			src:"/static/image/1-3.jpg"
            		},
            		{
            			src:"/static/image/1-4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"/static/image/1-5.jpg"
            		},
            		{
            			src:"/static/image/1-6.jpg"
            		},
            		{
            			src:"/static/image/1-7.jpg"
            		},
            		{
            			src:"/static/image/1-8.jpg"
            		}
            	]
        	}]
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

	res.render('goodlist', {
        layout: false,
        title: "首页",
        css_href: "/static/goodlist.css",
        pageNumber: page__,
        pre_pageNumber:pre_pageNumber,
        nxt_pageNumber:nxt_pageNumber,
        pageCount: page_number,
        personInfoList: [
        	{
        		flag:flags[1],
            	images1: [
            		{
            			src:"/static/image/1-1.jpg"
            		},
            		{
            			src:"/static/image/1-2.jpg"
            		},
            		{
            			src:"/static/image/1-3.jpg"
            		},
            		{
            			src:"/static/image/1-4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"/static/image/1-5.jpg"
            		},
            		{
            			src:"/static/image/1-6.jpg"
            		},
            		{
            			src:"/static/image/1-7.jpg"
            		},
            		{
            			src:"/static/image/1-8.jpg"
            		}
            	]
        	},
			{
        		flag:flags[2],
            	images1: [
            		{
            			src:"/static/image/2-1.jpg"
            		},
            		{
            			src:"/static/image/2-2.jpg"
            		},
            		{
            			src:"/static/image/2-3.jpg"
            		},
            		{
            			src:"/static/image/2-4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"/static/image/2-5.jpg"
            		},
            		{
            			src:"/static/image/2-6.jpg"
            		},
            		{
            			src:"/static/image/2-7.jpg"
            		},
            		{
            			src:"/static/image/2-8.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[3],
            	images1: [
            		{
            			src:"/static/image/3-1.jpg"
            		},
            		{
            			src:"/static/image/3-2.jpg"
            		},
            		{
            			src:"/static/image/3-3.jpg"
            		},
            		{
            			src:"/static/image/3-4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"/static/image/3-5.jpg"
            		},
            		{
            			src:"/static/image/3-6.jpg"
            		},
            		{
            			src:"/static/image/3-7.jpg"
            		},
            		{
            			src:"/static/image/3-8.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[4],
            	images1: [
            		{
            			src:"/static/image/4-1.jpg"
            		},
            		{
            			src:"/static/image/4-2.jpg"
            		},
            		{
            			src:"/static/image/4-3.jpg"
            		},
            		{
            			src:"/static/image/4-4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"/static/image/4-5.jpg"
            		},
            		{
            			src:"/static/image/4-6.jpg"
            		},
            		{
            			src:"/static/image/4-7.jpg"
            		},
            		{
            			src:"/static/image/4-8.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[5],
            	images1: [
            		{
            			src:"/static/image/5-1.jpg"
            		},
            		{
            			src:"/static/image/5-2.jpg"
            		},
            		{
            			src:"/static/image/5-3.jpg"
            		},
            		{
            			src:"/static/image/5-4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"/static/image/5-5.jpg"
            		},
            		{
            			src:"/static/image/5-6.jpg"
            		},
            		{
            			src:"/static/image/5-7.jpg"
            		},
            		{
            			src:"/static/image/5-8.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[6],
            	images1: [
            		{
            			src:"/static/image/6-1.jpg"
            		},
            		{
            			src:"/static/image/6-2.jpg"
            		},
            		{
            			src:"/static/image/6-3.jpg"
            		},
            		{
            			src:"/static/image/6-4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"/static/image/6-5.jpg"
            		},
            		{
            			src:"/static/image/6-6.jpg"
            		},
            		{
            			src:"/static/image/6-7.jpg"
            		},
            		{
            			src:"/static/image/6-8.jpg"
            		}
            	]
        	},
        	{
        		flag:flags[7],
            	images1: [
            		{
            			src:"/static/image/7-1.jpg"
            		},
            		{
            			src:"/static/image/7-2.jpg"
            		},
            		{
            			src:"/static/image/7-3.jpg"
            		},
            		{
            			src:"/static/image/7-4.jpg"
            		}
            	],
            	images2: [
            		{
            			src:"/static/image/7-5.jpg"
            		},
            		{
            			src:"/static/image/7-6.jpg"
            		},
            		{
            			src:"/static/image/7-7.jpg"
            		},
            		{
            			src:"/static/image/7-8.jpg"
            		}
            	]
        	}
        ]
    });

});

app.listen(3000);