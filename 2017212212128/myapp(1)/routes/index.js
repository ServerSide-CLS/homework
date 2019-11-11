var express = require('express');
var router = express.Router();
var pageSize=4
var tot=20;
var pageCount=tot/pageSize
var array = new Array();
var path="/static/";

for(var i=0;i<tot;i++){
  array.push({"name":"产品"+(i+1)});
}

router.get('/',(req,res)=>{
  res.render('./partials/content', { 
    entries:array, 
    pageSize:pageSize,    
    pageCount:pageCount,  
    tot:tot,          
    page:(req.query.page||1),   
    css:[path+'header.css',path+'content.css',path+'footer.css'],
 });
})

router.get('/index',(req,res)=>{
  res.render('./partials/content', { 
    entries:array, 
    pageSize:pageSize,
    pageCount:pageCount,  
    tot:tot,          
    page:(req.query.page||1), 
    css:[path+'header.css',path+'content.css',path+'footer.css'],
 });
});

module.exports = router;