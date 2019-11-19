var express = require('express');
var router = express.Router();
var Person = require('../server/db');

router.get('/', function(req, res){
    res.render('login', {layout: false, tip:''});
    
});
router.post('/', function(req, res){
    console.log(req.body.name)
    if(req.body.name){
        Person.find({userName: req.body.name}, function(err, response){
            console.log(response);
            if(response.length!=0){
                console.log('用户名存在');
                Person.find({userName: req.body.name, password: req.body.pwd}, function(err, response){
                    if(response.length!=0){
                        res.redirect('/index');
                    }
                    else res.render('login',{layout: false, tip:"密码错误"});
                })
            }
            else{
                console.log(response);
                return res.render('login',{layout: false, tip: "用户名不存在"});
            }
        });
    }
    else{
        return res.render('login', {layout: false, tip:''});
    }
    
});

module.exports = router;
