var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.get("/goodlist",function (req,res) {
    var pagenumber= req.query.pageNumber;
    var vis= new Array();
    var totpage=7;
    for(var i=1;i<=totpage;++i){
        vis[i]=false;
    }
    vis[pagenumber]=true;
     var prepage= pagenumber;
     var nextpage = pagenumber;
     if(parseInt(prepage)-1>0){
         prepage=prepage-1;
     }
    if(parseInt(nextpage)+1<=totpage){
        nextpage=parseInt(nextpage)+1;
    }

    res.render("goodlist",{

        layout:false,
        prepage:prepage,
        nextpage:nextpage,
        onepieceInfoList:[
            {
            vis:vis[1],
                images1:[
                    {
                        src:"Here is a picture 1_1"
                    },
                    {
                        src:"Here is a picture 1_2"
                    },
                    {
                        src:"Here is a picture 1_3"
                    },
                    {
                        src:"Here is a picture 1_4"
                    },
                ],
                images2:[
                    {
                        src:"Here is a picture 1_5"
                    },
                    {
                        src:"Here is a picture 1_6"
                    },
                    {
                        src:"Here is a picture 1_7"
                    },
                    {
                        src:"Here is a picture 1_8"
                    },
                ],
            },
            {
                vis:vis[2],
                images1:[
                    {
                        src:"Here is a picture 2_1"
                    },
                    {
                        src:"Here is a picture 2_2"
                    },
                    {
                        src:"Here is a picture 2_3"
                    },
                    {
                        src:"Here is a picture 2_4"
                    },
                ],
                images2:[
                    {
                        src:"Here is a picture 2_5"
                    },
                    {
                        src:"Here is a picture 2_6"
                    },
                    {
                        src:"Here is a picture 2_7"
                    },
                    {
                        src:"Here is a picture 2_8"
                    },
                ],
            },
            {
                vis:vis[3],
                images1:[
                    {
                        src:"Here is a picture 3_1"
                    },
                    {
                        src:"Here is a picture 3_2"
                    },
                    {
                        src:"Here is a picture 3_3"
                    },
                    {
                        src:"Here is a picture 3_4"
                    },
                ],
                images2:[
                    {
                        src:"Here is a picture 3_5"
                    },
                    {
                        src:"Here is a picture 3_6"
                    },
                    {
                        src:"Here is a picture 3_7"
                    },
                    {
                        src:"Here is a picture 3_8"
                    },
                ],
            },
            {
                vis:vis[4],
                images1:[
                    {
                        src:"Here is a picture 4_1"
                    },
                    {
                        src:"Here is a picture 4_2"
                    },
                    {
                        src:"Here is a picture 4_3"
                    },
                    {
                        src:"Here is a picture 4_4"
                    },
                ],
                images2:[
                    {
                        src:"Here is a picture 4_5"
                    },
                    {
                        src:"Here is a picture 4_6"
                    },
                    {
                        src:"Here is a picture 4_7"
                    },
                    {
                        src:"Here is a picture 4_8"
                    },
                ],
            },
            {
                vis:vis[5],
                images1:[
                    {
                        src:"Here is a picture 5_1"
                    },
                    {
                        src:"Here is a picture 5_2"
                    },
                    {
                        src:"Here is a picture 5_3"
                    },
                    {
                        src:"Here is a picture 5_4"
                    },
                ],
                images2:[
                    {
                        src:"Here is a picture 5_5"
                    },
                    {
                        src:"Here is a picture 5_6"
                    },
                    {
                        src:"Here is a picture 5_7"
                    },
                    {
                        src:"Here is a picture 5_8"
                    },
                ],
            },
            {
                vis:vis[6],
                images1:[
                    {
                        src:"Here is a picture 6_1"
                    },
                    {
                        src:"Here is a picture 6_2"
                    },
                    {
                        src:"Here is a picture 6_3"
                    },
                    {
                        src:"Here is a picture 6_4"
                    },
                ],
                images2:[
                    {
                        src:"Here is a picture 6_5"
                    },
                    {
                        src:"Here is a picture 6_6"
                    },
                    {
                        src:"Here is a picture 6_7"
                    },
                    {
                        src:"Here is a picture 6_8"
                    },
                ],
            },
            {
                vis:vis[7],
                images1:[
                    {
                        src:"Here is a picture 7_1"
                    },
                    {
                        src:"Here is a picture 7_2"
                    },
                    {
                        src:"Here is a picture 7_3"
                    },
                    {
                        src:"Here is a picture 7_4"
                    },
                ],
                images2:[
                    {
                        src:"Here is a picture 7_5"
                    },
                    {
                        src:"Here is a picture 7_6"
                    },
                    {
                        src:"Here is a picture 7_7"
                    },
                    {
                        src:"Here is a picture 7_8"
                    },
                ],
            }
        ]
    });
});
app.listen(3000);