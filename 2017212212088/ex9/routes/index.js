var express = require('express');
const index = express.Router();

index.get('/index', function(req, res){
   res.render('index', {
        layout: false,
        title: "index",
    });
});

module.exports = index;