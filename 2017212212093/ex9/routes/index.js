var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('default.hbs' );
});


module.exports = router;


var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user');

//创建一个新的Schema模型。该模型将充当我们数据库中的集合。
var personSchema = mongoose.Schema({
  email: String,
  pwd: String
});

var Person = mongoose.model("Person", personSchema);


router.get('/personList', function(req, res){
   Person.find(function(err, response){
      res.json(response);
   });
});

app.post('/login',function(req,res){
  var personInfo = req.body; //Get the parsed information
  // var result=sendCode(req.body.email); 
  Person.find({name: personInfo.email, pwd:personInfo.pwd}, 
  function(err, response){
     if(response.length!=0){
      res.render('index.html' );
     }
     else{
       res.render("login.hbs");
     }
});
//     if(result.status==200)
//       res.send("success");
//     else
//       res.send("fail");
// });

app.post('/formSend', function(req, res){
  var personInfo = req.body; //Get the parsed information
  var mail=req.body.email;
  var reg1 = /^\w{5,}@[a-z0-9]{2,3}\.[a-z]+$|\,$/;

  if(!mail.matches(reg1)){
       res.send({status:"f",reason:"邮箱格式不正确"});
  }
  else if(req.body.pwd!=req.body.checkPwd){
       res.send({status:"f",reason:"密码确认不正确!"});
  }
  else if(req.body.checkCode!=checkcode){
   res.send({status:"f",reason:"验证码不正确"});
  }
  else{
    var newPerson = new Person({
      email: req.body.email,
      pwd:req.body.pwd
   });

   Person.find({email: req.body.email}, 
   function(err, response){
      if(response.length!=0)
        res.send({status:"f",reason:"邮箱账号已存在"});

        else{
          newPerson.save(function(err, Person){
            if(err)
               res.render('show_message', {message: "Database error", type: "error"});
            else
               res.render('show_message', {
                  message: "New person added", type: "success", person: personInfo});
         });
        }
   });

   
}
     res.send({status:"s"}); 

    //  if (Users.length>0) {
    //       Users.filter((user)=>{
    //       if(user.email === req.body.email){
    //         alert( "User Already Exists!");
    //     }
    //    else{
    //       var newUser = {email: req.body.email, password: req.body.pwd};
    //       Users.push(newUser);
    //     }
    //   });
    // }else{
    //   var newUser = {email: req.body.email, password: req.body.pwd};
    //   Users.push(newUser);
    //   req.session.user = newUser;
    // }
    // fs.writeFileSync("/user.json",JSON.stringify({"email":req.body.email,"pwd":req.body.pwd}));
    
  });