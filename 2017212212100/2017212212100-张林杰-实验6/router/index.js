var router = require("express").Router();
var fs = require("fs");


/**
 * 获取当前事件
 */
router.get("/time", (req, res) => {
    let date = new Date();
    res.send(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
});


/**
 * 获取用户名
 * windows使用本地文件(/etc/passwd)进行模拟(默认)
 * linux系统将data的上行代码注释取消，将data的下行代码注释掉
 */
router.post("/user", (req, res) => {
    try {
        let data = fs.readFileSync("/etc/passwd").toString().split("\n");  // Linux
        //let data = fs.readFileSync("./etc/passwd").toString().split("\r\n"); // Window
        let result = [];
        data.forEach(item => {
            result.push(item.split(":")[0]);
        })
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send("出现异常错误")
    }
});



/**
 * 校验手机号 
 */
router.get("/phone/:id", (req, res) => {
    /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(req.params.id) ? res.send("ok") : res.send("no");
});


// 模块导出
module.exports = router;