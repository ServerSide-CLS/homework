/*
-n 学生名称
-l 输出列表
-a 统计结果
*/

//读取文件
var fs=require("fs");
fs.readFile("study.txt",function(err,data){
    if(err){
        return console.error(err);
    }

    //数据存入数组
    var arr=data.toString().split("\r\n");
    //转换成二维数组[name][attribute]
    var arr2 = [];
    for(var i = 0; i < arr.length; i++){
        arr2[i] = arr[i].split();
        arr2[i] = arr2[i][0].replace(/\s+/g, ' ').split(' ');
    }

    //设置对象数组
    var objArray = [];
    for (var i = 0; i < arr.length; i++) {
        objArray.push({name:arr2[i][0],date:arr2[i][1],job:arr2[i][2],money:arr2[i][3]});
    }
    //console.log(objArray);

    
    //student{name:total_money}
    //time{date:money}
    var student = new Object();
    var time = new Object();
    objArray.forEach(item => {
        student[item.name] = 0;
        time[item.date] = 0;
    });
    objArray.forEach(item => {
        student[item.name] += Number(item.money);
        time[item.date] += Number(item.money);
    });
    // console.log(student);
    // console.log(time);

    //获取命令行输入
    var arguments = process.argv.splice(2);
 
    var len=arguments.length;
    if(len==1){
        if(arguments[0]=="-l"){
            //console.log("只有一个参数是l");
            //输出全部学生赚的钱列表
            for (var key in student) {
                console.log(key + "\t" + student[key]);
            }
        }else{
            // console.log("只有一个参数是a");
            //输出统计结果
            var maxName, minName, maxDate, minDate;
            var maxStMoney = 0, minStMoney = 9999, maxDayMoney = 0, minDayMoney = 9999;
            //赚钱最多(少)的学生
            for (var key in student) {
                if (maxStMoney < student[key]) {
                    maxName = key;
                    maxStMoney = student[key];
                }
                if (minStMoney > student[key]) {
                    minName = key;
                    minStMoney = student[key];
                }
            }
            //赚钱最多（少）的日子
            for (var key in time) {
                if (maxDayMoney < time[key]) {
                    maxDate = key;
                    maxDayMoney = time[key];
                }
                if (minDayMoney > time[key]) {
                    minDate = key;
                    minDayMoney = time[key];
                }
            }
            console.log("赚钱最多的学生:\t" + maxName +"\n赚钱最少的学生:\t" + minName +"\n赚钱最多的日子:\t" + maxDate +"\n赚钱最少的日子:\t" + minDate);
        }
    }else if(len==2){
        // console.log("有两个参数，分别为 -n wang");
        //输出wang的赚的钱总和
        total = 0;
        objArray.forEach(item => {
            if(arguments[1] == item.name){
                total += parseInt(item.money);
            }
        })
        console.log(arguments[1] + "\t" + total);
    }else{
        // console.log("有三个参数，分别为-n wang -l");
        //输出wang的列表
        objArray.forEach(item => {
            if(arguments[1] == item.name){
                console.log(item.name+"\t"+item.date+"\t"+item.job+"\t"+item.money+"\t");
            }
        })
    }
});
