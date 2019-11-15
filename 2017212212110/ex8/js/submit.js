var fs = require('fs');
var path = require("path");

function register(email,pwd){
    var params = {
        "email": email,
        "pwd": pwd
    }
    var user;
    try{
        var data = fs.readFileSync(path.resolve(__dirname + "/user.json"));

        user = data.toString();
        user = JSON.parse(user);

        for(var i = 0; i < user.data.length; i++){
            // 查询邮箱有无注册
            if(user.data[i].email == params.email){
                throw new Error("该邮箱已被注册")
            }
        }
        user.data.push(params);
        var str = JSON.stringify(user);
        fs.writeFile(path.resolve(__dirname + "/user.json"),str,function(err){
            if(err){
                console.error(err);
            }
        })
    } catch (err){
        throw new Error(err.toString())
    }
};

module.exports = register;