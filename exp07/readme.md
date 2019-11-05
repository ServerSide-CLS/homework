# 实验七 
## 服务端渲染

+ 模块选用
    + handlerbar
    + bootstrap

+ 页面组成
    + header
    + content
        + 内容
        + 页面翻动
    + footer

+ 完成程度
    + 页面翻页
        + 上一页，下一页
        + 直接点击页面
    + 当前页面所在的页码背景色为黄绿色，便于识别当前页码
        + 实现方法：构建一个类似于类的储存多种信息，包括当前页码和是否在当前页
        ```js
        const List = pageCountList.map(value => {
        return {
            b: value,
            flag_choose: page == value ? true : false,    
            flag_not_choose: page != value ? true : false 
            }
        })
        ```

+ 运行
    + cd .../ex7   (windows上运行)
    + node app.js
    + http://localhost:3000
    + 提交时删除了node_modules 文件