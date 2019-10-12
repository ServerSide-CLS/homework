const fs = require("fs");
const readLine = require("readline");
// 读取文件
function readFS(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,"utf-8",(err,data) => {
            if(err){
                return console.log("读取文件失败，"+err.message);
            }
            resolve(data);
        });
    });
}
readFS("study.txt").then((data) => {
    let arr = data.split(/[\n\r]/g);
    for(let i=0;i<data.length;i++){
        if(arr[i]==""){
            arr.splice(i,1);
            i--;
        }
    }
    let arrLine = new Array();//文件内容数组
    arr.forEach((item,index) => {
        let temp = item.split(/[ ]/g);
        for(let i=0;i<temp.length;i++){
            if(temp[i]==""){
                temp.splice(i,1);
                i--;
            }
        }
        arrLine.push(temp);
    });
    let inputCont = process.argv.splice(2);
    let student = new Array();//姓名-金额 数组
    let comLen = inputCont.length;//输入指令长度
    //计算得到student数组
    arrLine.forEach((item,index) => {
        let studentName = item[0],
        money = item[3];
        if(student.length == 0){
            student.push({"name":studentName,"money":money});
        }
        else{
            let flag = 0;
            student.forEach((item1,index1)=>{
                if(studentName === item1.name){
                    flag = 1;
                    return student[index1].money = (parseInt(student[index1].money) + parseInt(money)).toString();
                }
            });
            if(flag == 0){
                student.push({"name":studentName,"money":money});
            }
            
        }     
    });
    if(comLen === 2){
        if(inputCont[1] == "-l"){
            student.forEach((item,index)=>{
                console.log(item.name.padEnd(10," "),item.money);
            });
        } 
        if(inputCont[1] == "-a"){
            let earnMostPerson,//赚钱最多的人
            earnLessPerson,//赚钱最少的人
            earnMostDate,//赚钱最多的日期
            earnLessDate;//赚钱最少的日期
            //将student数组根据money进行降序排序
            let earnMoneyArr = student.sort(function(a,b){
                if(parseInt(a.money)-parseInt(b.money)>0){
                    return -1;
                }
                else{
                    return 1;
                }
            });
            earnMostPerson = earnMoneyArr[0].name;
            earnLessPerson = earnMoneyArr[earnMoneyArr.length-1].name;
            let dateArr = new Array();
            arrLine.forEach((item,index)=>{
                let dateTime = item[1],
                dateMoney = item[3];
                if(dateArr.length === 0){
                    dateArr.push({"dateTime":dateTime,"dateMoney":dateMoney});
                }
                else{
                    var flag1 = 0;
                    dateArr.forEach((item1,index1)=>{
                        if(item1.dateTime === dateTime){
                            flag1 = 1;
                            return dateArr[index1].dateMoney = (parseInt(dateArr[index1].dateMoney) + parseInt(dateMoney)).toString();
                        }
                    });
                    if(!flag1){
                        dateArr.push({"dateTime":dateTime,"dateMoney":dateMoney});
                    }
                }
            });
            dateArr = dateArr.sort(function(a,b){
                if(parseInt(a.dateMoney)-parseInt(b.dateMoney)>0){
                    return -1;
                }
                else{
                    return 1;
                }
            });
            earnMostDate = dateArr[0].dateTime;
            earnLessDate = dateArr[dateArr.length-1].dateTime;
            var outputStr = `赚钱最多的学生: ${earnMostPerson}\n赚钱最少的学生: ${earnLessPerson}\n赚钱最多的日子: ${earnMostDate}\n赚钱最少的日子: ${earnLessDate}`;
            console.log(outputStr);
        }
    }
    if(comLen === 3){
        let studentName = inputCont[2],
        totalMoney = 0;
        arrLine.forEach((item,index)=>{
            if(item[0] === studentName){
                totalMoney += parseInt(item[3]);
            }
        });
        console.log(totalMoney);
    }
    if(comLen === 4){
        let studentName = inputCont[2];
        arrLine.forEach((item,index)=>{
            if(item[0] === studentName){
                let str = "";
                item.forEach((item1,index1)=>{
                    str += item1 + "  ";
                });
                console.log(str);
            }
        });
    }
});
