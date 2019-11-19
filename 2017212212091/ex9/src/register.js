var Mongo = require("./mongo");

function register(email,pwd){
    var params = {
        "email": email,
        "pwd": pwd
    }
    try {
        Mongo.Person.find({ email: params.email }, function (err, response) {
            if (err) {
                res.send({ msg: err.toString(), code: -1 })
            }
            if (response.length != 0) {
                res.send({ msg: "该邮箱已经存在,无法注册", code: -1 })
            } else {
                let newUser = new Mongo.Person({
                    email: params.email,
                    password: params.pwd,
                })
                newUser.save(function (err, Person) {
                    if (err) {
                        res.send({ msg: err.toString(), code: -1 })
                    } else {
                        res.send({ msg: "注册成功! 3s后跳转到登录页面", code: 200 })
                    }
                })
            }
        })
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
};

module.exports = {
    register
}