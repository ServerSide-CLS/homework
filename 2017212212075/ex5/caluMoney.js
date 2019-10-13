var fs = require('fs');
var info = fs.readFileSync('study.txt','utf-8').toString().split('\r\n');
const item = info.map((item)=>{
        return item.split(/\s+/g);
});
let input = process.argv.splice(2);
let len = input.length;


let student = new Array();
let date_set = new Array();

item.forEach((value,index) => {
    let name = value[0],
        date = value[1],
        job = value[2],
        money = value[3];
    //按学生
    if(student.length == 0){
        student.push({"name":name,"money":money});
    }
    else{
        let flag = 0;
        student.forEach((value1,index1)=>{
            if(name === value1.name){
                flag = 1;
                return student[index1].money = (parseInt(student[index1].money) + parseInt(money)).toString();
            }
        });
        if(flag == 0){
            student.push({"name":name,"money":money});
        }

    }
    //按日期
    if(date_set.length == 0){
        date_set.push({"date":date,"money":money});
    }
    else{
        let flag = 0;
        date_set.forEach((value1,index1)=>{
            if(date === value1.date){
                flag = 1;
                return date_set[index1].money = (parseInt(date_set[index1].money) + parseInt(money)).toString();
            }
        });
        if(flag == 0){
            date_set.push({"date":date,"money":money});
        }

    }
});
//学生排序
student.sort(function (item1,item2) {
    if(parseInt(item1.money)-parseInt(item2.money)>0){
        return -1;
    }
    else{
        return 1;
    }

})
//日期排序
date_set.sort(function (item1,item2) {
    if(parseInt(item1.money)-parseInt(item2.money)>0){
        return -1;
    }
    else{
        return 1;
    }

})
if(len == 1){
    input.forEach((value,index)=>{
        switch (value) {
            case '-l':
                student.forEach((item)=>{
                    console.log(item.name.padEnd(10,' '),item.money);
                });
                break;
            case '-a':
                console.log("赚钱最多的学生：",student[0].name);
                console.log("赚钱最少的学生：",student[student.length-1].name);
                console.log("赚钱最多的日子：",date_set[0].date);
                console.log("赚钱最少的日子：",date_set[date_set.length-1].date);
                break;
            default:
	console.log("输入参数有误！");
	break;

        }
    })

}
else if(len == 2){
    let flag1 = 0;
    student.forEach(value => {
        if(value.name == input[1]){
            console.log(value.money);
            flag1 = 1;
        }
    })
    if(flag1 == 0){
        console.log("输入姓名有误！");
    }

}
else if(len == 3 && (input[0]=='-n'&&input[2]=='-l')){
    item.forEach(value => {
        if(value[0] == input[1] ){
            console.log(value[0].padEnd(10,' '),
                value[1].padEnd(15,' '),
                value[2].padEnd(5,' '),
                value[3].padStart(5,' ')
            );
        }
    })

}
else{
    console.log("输入参数信息错误！");
}
