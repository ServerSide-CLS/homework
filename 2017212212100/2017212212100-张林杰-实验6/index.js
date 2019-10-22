var express = require("express"); //express依赖引入 
var router = require("./router"); // 路由模块引入
var app = express(); // express对象实例生成

app.use("/", router); // 路由模块挂载到app上



/**
 * 将路由的首页跳转到/time路径下
 */
app.use((req, res, next) => {
    if (req.originalUrl == "/") {
        return res.redirect("/time");
    }
})


/**
 * app端口监听
 */
app.listen(3000, () => {
    console.log("the app is running in http://localhost:3000");
});