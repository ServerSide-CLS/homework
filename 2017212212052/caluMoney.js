var fs = require('fs');

const data = fs.readFileSync('study.txt',"utf-8").toString().split('\r\n').map((item)=>{
  return item.split(/\s+/);
});

const parameter  = process.argv.splice(2);
if(parameter.includes("-l")&&parameter.includes("-n")){
  const index = parameter.indexOf('-n');

  data.forEach((value)=>{
    if(value[0]===parameter[index+1]){
      console.log(value.toString().replace(/,/g,'\t'));
    }
  });
  return;
}

parameter.forEach((value,index)=>{
  let res;
  switch (value) {
    case "-n":
      let name = parameter[index+1];
      res = aSort(0);
      res = new Map(res);
      console.log(`${name}:\t${res.get(name)}`);
      break;
    case "-l":
      res = aSort(0);
      res.forEach((value)=>{
        console.log(`${value[0]}:\t${value[1]}`)
      });
      break;
    case "-a":
      res = aSort(0);
      console.log("赚钱最多的学生：",res[res.length-1][0]);
      console.log("赚钱最少的学生：",res[0][0]);
      res = aSort(1);
      console.log("赚钱最多的日子：",res[res.length-1][0]);
      console.log("赚钱最少的日子：",res[0][0]);
      break;
    default:
      break;
  }
});

function aSort(index){
  let arr = new Map();
  data.forEach((item)=>{
    const money = item[3];
    if(arr.has(item[index])){
      arr.set(item[index],arr.get(item[index])+parseInt(money));
    }
    else{
      arr.set(item[index],parseInt(money));
    }
  });
  arr = Array.from(arr);
  arr.sort((a,b)=>{return a[1]-b[1]});
  return arr;
}