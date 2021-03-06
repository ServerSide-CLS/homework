var express = require('express');
var router = express.Router();
var Handlebars=require("handlebars");
var pageSize=8
var tot=56;
var pageCount=tot/pageSize
var array = new Array();
var path="/static/stylesheets/";

for(var i=0;i<tot;i++){
  array.push({"name":"产品"+(i+1)+"","productData":"产品信息"});
}

router.get('/',(req,res)=>{
  res.render('./partials/content', { 
    entries:array,  //产品信息
    pageSize:pageSize,    
    pageCount:pageCount,  
    tot:tot,          
    page:(req.query.page||1),   
    css:[path+'header.css',path+'content.css',path+'footer.css'],
 });
})

router.get('/index',(req,res)=>{
  res.render('./partials/content', { 
    entries:array,  //产品信息
    pageSize:pageSize,
    pageCount:pageCount,  
    tot:tot,          
    page:(req.query.page||1), 
    css:[path+'header.css',path+'content.css',path+'footer.css'],
 });
});

module.exports = router;
