var fs = require("fs");

var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

function chekEmail(req,res){
    let email = req.query.email;
    console.log(email);
    console.log(reg.test(email));
    if (email == "") {
        return 0;
        // res.send("请填写邮箱");
    }else if (!reg.test(email)) {
        
        return 1;
        // res.send("邮箱错误!");
    }
}
function chechAll(req,res){
    // 获取表单项
    console.log(req.body);
    let email = req.body.email;
    let verification = req.body.verification;
    let password = req.body.password;
    let rePassword = req.body.rePassword;

    //服务器验证
    if (email == "") {
        res.send("请填写邮箱");
    } else if (verification == "") {
        res.send("请填写验证码");
    } else if (password == "") {
        res.send("请填写密码");
    } else if (rePassword == "") {
        res.send("请重复密码");
    } else {
        if (reg.test(email)) {
            if (verification == code) {
                if (password == rePassword) {
                    //写入user.json
                    var data = "{\n" +
                        "  \"email\": \"" + email + "\",\n" + "  \"password\": \"" + password + "\"\n" + "}\n";
                    fs.appendFile("./user.json", data, (error) => {
                        if (error) return console.log("添加失败" + error.message);
                        console.log("添加成功");
                    });

                    res.send("注册成功!");
                } else {
                    res.send("密码不相同！");
                }
            } else {
                res.send("验证码错误!");
            }
        } else {
            res.send("邮箱错误!");
        }
    }
}

exports.chekEmail = chekEmail;
exports.chechAll = chechAll;