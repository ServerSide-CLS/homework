let mongoose = require("mongoose");
var DB_CONN_STR = "mongodb://127.0.0.1:27017/new_db";
mongoose.connect(DB_CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true });

let userSchema = mongoose.Schema({
    password:String,
    email:String
});

mongoose.connect(DB_CONN_STR,(err)=>{
    if(err){
        console.log("连接失败");
    }else{
        console.log("连接成功");
    }
})

let user = mongoose.model("user", userSchema);

// user.find({email:"1049668876@qq.com",password:"123"}, 
//    function(err, response){
//       console.log(response);
// });
// var myUser = new user({
//     password : '123',                
//     email: '1049668876@qq.com',                      
// });

// myUser.save(function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         console.log("Res:" + res);
//     }

// });
module.exports = {
    user
};