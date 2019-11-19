var express = require('express');
var hbs = require('express-handlebars')
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var help = {
  if_eq: function (v1,v2,opts) {
    if(v1 == v2)
      return opts.fn(this);
    else
      return opts.inverse(this);
  },
};

// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

// 解析 multipart/form-data
// app.use(multer()); 

app.use('/', require('./routes/index'));

app.use('/mail', require('./routes/sendMail'));

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');//设置模板引擎
app.engine('.hbs', hbs ({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: help,
  }));

app.listen(3001)