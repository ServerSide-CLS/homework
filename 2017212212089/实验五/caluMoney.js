var fs=require("fs");
var line = fs.readFileSync('study.txt','utf-8').toString().split('\r\n');

function sort(i){
    var arr = new Map();
    data.forEach((item)=>{
        const money = item[3];
        if(arr.has(item[i])){
            arr.set(item[i],arr.get(item[i])+parseInt(money));
        }
        else{
            arr.set(item[i],parseInt(money));
        }
    });
    arr = Array.from(arr);
    arr.sort((a,b)=>{return a[1]-b[1]});
    return arr;
}

const data = line.map((item)=>{
	return item.split(/\s+/);
});

const param = process.argv.splice(2);
if(param.includes("-l")&&param.includes("-n")){
    const index = param.indexOf('-n');
    data.forEach((value) => {
        if(value[0] === param[index+1]){
            console.log(value.toString().replace(/,/g,'\t'));
        }
    });
    return;
}

param.forEach((value,i) => {
  var result;
  switch (value) {
    case "-n":
        let name = param[i+1];
        result = sort(0);
        result = new Map(result);
        console.log(`${name}:\t${result.get(name)}`);
        break;
    case "-l":
        result = sort(0);
        result.forEach((value)=>{
            console.log(`${value[0]}:\t${value[1]}`)
        });
      break;
    case "-a":
        result = sort(0);
        console.log("赚钱最多的学生：",result[result.length-1][0]);
        console.log("赚钱最少的学生：",result[0][0]);
        result = sort(1);
        console.log("赚钱最多的日子：",result[result.length-1][0]);
        console.log("赚钱最少的日子：",result[0][0]);
        break;
    default:
        break;
    }
});
