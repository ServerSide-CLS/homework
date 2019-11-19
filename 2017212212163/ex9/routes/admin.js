var express = require('express');
var router = express.Router();
var Person = require('../server/db');


router.get('/', function(req, res, next) {
  Person.find(function(error, response){
      console.log(a=response)
        res.json(response);
  });


 
});



module.exports = router;
