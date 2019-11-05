const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const path = require("path");
const createData = require("./public/js/main.js");
let page = 0;//页面数
let pNow = 8;//每页条数
let row = 1;//行数
let rNom = 4;//每行条数
let data;//处理后的数据
//将数据变为对象存入数组
function createDataList(){
    let tempData = createData();
    let list = tempData.list;
    let dataList = new Array();
    list.forEach((element,index) => {
        let temp = {name:element.name,cTime:element.cTime};
        dataList.push(temp);
    });
    return dataList;
}
//创建分页项
function createPagination(){
    page = Math.ceil(data.length/pNow);
    let tempPageArr = new Array();
    //页数数组
    for(let i=1;i<=page;i++){
        tempPageArr.push({pNow:i});
    }
    return tempPageArr;
}
//创建每页数据
function createDataArr(pageNow){
    let pageStart = (pageNow-1)*pNow;
    let pageEnd = (pageStart+pNow)>data.length?data.length:pageStart+pNow;
    row = Math.ceil((pageEnd-pageStart)/rNom);
    let tempArr = new Array();
    for(let i=0;i<row;i++){
        let tempRowArr = new Array();
        if(i!=row-1){
            for(j=pageStart+i*rNom;j<pageStart+i*rNom+rNom;j++){
                tempRowArr.push({name:data[j].name+j,cTime:data[j].cTime});
            }
        }
        else{
            for(j=pageStart+i*rNom;j<pageEnd;j++){
                tempRowArr.push({name:data[j].name+j,cTime:data[j].cTime});
            }
        }
        
        tempArr.push({rowData:tempRowArr});
    }
    return tempArr;
}
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"views"));
app.use("/static/",express.static(path.join(__dirname,"public")));
app.use("/node_modules/",express.static(path.join(__dirname,"node_modules")));
app.engine(".hbs",hbs({
    extname:".hbs",
    defaultLayout:"main",
    layoutsDir:__dirname + "/views/layouts/",
    partialsDir:__dirname + "/views/partials/"
}));
app.get("/",(req,res)=>{
    data = createDataList();
    let pageArr = createPagination();
    let dataArr = createDataArr(1);
    res.render("home",{layout:"main",list:dataArr,page:pageArr});
});
app.get("/page:pages",(req,res)=>{
    let pageArr = createPagination();
    let pageNow = req.params.pages;
    //当前页号
    let dataArr = createDataArr(pageNow);
    res.render("home",{layout:"main",list:dataArr,page:pageArr});
});
app.listen(8888);