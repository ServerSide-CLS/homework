var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { authGuard } = require("./src/lib/authGuard");
const indexRouter = require("./routes/index");
const hbs = require("express-handlebars");
const { sass } = require("./src/lib/sassMiddleware");
const session = require("express-session");
const app = express();
app.engine(
  ".hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "default",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(authGuard());//身份转变
app.use("/stylesheets", sass());
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
