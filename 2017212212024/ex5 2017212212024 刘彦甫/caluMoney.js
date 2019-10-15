const argv = process.argv.splice(2);
var fs = require("fs");
var arr=[];
var arr1=[];
var name=[];
var time=[];
var job=[];
var money=[];
//读文件
var data=fs.readFileSync('study.txt');
//按回车分隔
var student=data.toString().trim().split(/\s\n+/);
for (var i=0;i<student.length;i++){
  arr.push(student[i]); 
}
//按空格分隔
var student1=arr.toString().trim().split(/\s+/);
var student1=student1.toString().trim().split(/,+/);
// console.log(student1);
for (var j = 0; j < student1.length; j++) {
  arr1.push(student1[j]);
  }
for(var index=0; index<arr1.length;index+=4){
  name.push(arr1[index]);
  time.push(arr1[index+1]);
  job.push(arr1[index+2]);
  money.push(arr1[index+3]);

}
//建立一个每个人的挣钱数的map
var stuAllMoney=new Map();
for (let i = 0; i < name.length; i++) {
  if (!stuAllMoney.has(name[i])) {
    stuAllMoney.set(name[i],money[i]);
  }
  else{
    let total =parseInt(stuAllMoney.get(name[i]))+parseInt(money[i]);
    stuAllMoney.set(name[i],total);
  }
}
//建立一个每天获钱数的map
var dailyMoney=new Map();
for (let i = 0; i < time.length; i++) {
  if (!dailyMoney.has(time[i])) {
    dailyMoney.set(time[i],money[i]);
  } else {
    let total=parseInt(dailyMoney.get(time[i]))+parseInt(money[i]);
    dailyMoney.set(time[i],total);
  }
}
//确定后面的参数
if (argv[0]==="-a" && argv.length===1) {
  //得到最多最少的学生
  let stuAllMoneyList=Array.from(stuAllMoney);
  stuAllMoneyList.sort((a,b)=>{
    return a[1]-b[1];
  });
  let minName=stuAllMoneyList[0][0];
  let maxName=stuAllMoneyList[stuAllMoneyList.length-1][0];
  //得到最多最少的日子
  let dailyMoneyList=Array.from(dailyMoney);
  dailyMoneyList.sort((a,b)=>{
    return a[1]-b[1];
  });
  let minTime=dailyMoneyList[0][0];
  let maxTime=dailyMoneyList[dailyMoneyList.length-1][0];
  console.log("赚钱最多的学生:"+maxName);
  console.log("赚钱最少的学生:"+minName);
  console.log("赚钱最多的日子:"+maxTime);
  console.log("赚钱最少的日子:"+minTime);
}else if(argv[0]==="-l" && argv.length===1){
  for(let [key,value] of stuAllMoney){
    console.log(key+"   "+value);
  }
}else if(argv.length===2 &&argv[0]==="-n"&&argv[1]!==null){
  let stuName=argv[1];
  if(!stuAllMoney.has(stuName)){
    console.log("查无此人");
  }
  else{
    console.log(stuName+"  "+stuAllMoney.get(stuName));
  }
}else if(argv.length===3 &&argv[0]==="-n"&&argv[1]!==null&&argv[2]==="-l"){
  let stuName=argv[1];
  for (let i = 0; i < name.length; i++) {
    if(stuName===name[i]){
      console.log(name[i]+"  "+time[i]+"  "+job[i]+"  "+money[i]);
    }
  }
}else{
  console.log("参数使用错误");
}
