var hbs = require('express-handlebars');
var express = require('express');
var app = express();
var path = require('path')
var indexRouter = require('./routes/index');
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs',hbs({
    extname:'.hbs',
    defaultLayout:'default',
    layoutsDir:__dirname+'/views/layouts/',
    partialsDir:__dirname+'/views/partials'
}));
app.use('/', indexRouter);
app.listen(8900);


