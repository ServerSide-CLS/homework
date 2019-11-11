var path = require("path");
var express = require("express");
var hbs = require("express-handlebars");
var bodyParser = require("body-parser");

var router = require("./router");

var app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.engine('.hbs', hbs({
    extname: ".hbs",
    defaultLayout: 'register',
    layoutsDir: __dirname + "/views/layouts/",
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);

app.use(express.static(__dirname + "/public"));

app.listen(3000, () => {
    console.log("server starts on http://localhost:3000");
});