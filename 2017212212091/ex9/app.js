var path = require("path");
var express = require("express");
var hbs = require("express-handlebars");
var bodyParser = require('body-parser')

var router = require("./router");

var app = express();

// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);


app.listen(3000, () => {
    console.log("start server on http://localhost:3000");
});