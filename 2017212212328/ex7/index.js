'use strict';
var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')
var helper = require('./utils/helper')

var ret = []
for(let i =0;i<50;i++) {
  ret.push(i)
}   
let count = ret.length
let pagesize  = 10
let pageCount = count/pagesize

// 设置模板引擎
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: helper,
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/person', function(req, res){
   let pageNumber = req.query.page || 1
   let entries = ret.slice((pageNumber-1)*pagesize, pageNumber*pagesize)
   res.render('page',{
     entries:    entries,
     pageCount:  pageCount,
     pageNumber: pageNumber,
     count:      count,
   })
});

app.listen(8000);
