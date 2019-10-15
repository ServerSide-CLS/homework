var fs=require("fs");

//读取txt文件
var data = fs.readFileSync('study.txt','utf-8');
var element = data.split(/\s+/);

//数据存入array
var array = new Array();
lines = data.split('\r\n');
var k = 0;
for (var i = 0; i < lines.length; i++) {
    array.push({name:element[0+k],day:element[1+k],job:element[2+k],money:element[3+k]});
    k += 4;
}
//console.log(array);

//传入的参数
var arguments = process.argv.splice(2);

//获取学生时间 赚钱总额
var student = new Object();
var time = new Object();
array.forEach(item => {
    student[item.name] = 0;
    time[item.day] = 0;
});
array.forEach(item => {
    student[item.name] += Number(item.money);
    time[item.day] += Number(item.money);
});

//-n -l同时传入
if((arguments[0]=='-n' && arguments[2]=='-l')){
    array.forEach(item => {
        if(arguments[1] == item.name){
            console.log(
                (item.name.toString()),(item.day.toString()),(item.job.toString()),(item.money.toString()));
        }
    })
}

//其他传入情况
else{
    arguments.forEach((item)=>{
        switch (item){
            case "-n":
                sum = 0;
                array.forEach(item => {
                    if(arguments[1] == item.name){
                        sum += parseInt(item.money);
                    }
                })
                console.log(arguments[1] + "\t" + sum);
                break;
            case "-l":
                for (var key in student) {
                    console.log(key + "\t" + student[key]);
                }
                break;
            case "-a":
                var maxName, minName, maxDate, minDate;
                var maxMoney1 = 0, minMoney1 = 9999, maxMoney2 = 0, minMoney2 = 9999;
                for (var key in time) {
                    if (maxMoney2 < time[key]) {
                        maxDate = key;
                        maxMoney2 = time[key];
                    }
                    if (minMoney2 > time[key]) {
                        minDate = key;
                        minMoney2 = time[key];
                    }
                }
                for (var key in student) {
                    if (maxMoney1 < student[key]) {
                        maxName = key;
                        maxMoney1 = student[key];
                    }
                    if (minMoney1 > student[key]) {
                        minName = key;
                        minMoney1 = student[key];
                    }
                }
                console.log(
                    "赚钱最多的学生:\t" + maxName +"\n赚钱最少的学生:\t" + minName +"\n赚钱最多的日子:\t" + maxDate +"\n赚钱最少的日子:\t" + minDate);
                break;
            default:
                break;
        }
    });
}



