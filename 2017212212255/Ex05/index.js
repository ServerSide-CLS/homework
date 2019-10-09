var fs = require('fs');
var data = fs.readFileSync('study.txt').toString();
var Arr = data.split('\r\n');
var dataArr = [];
for (i in Arr){
    dataArr.push(Arr[i].split(/\s+/));
}
// name = 'wang';
// console.log(dataArr);


var arguments = process.argv.splice(2);
// console.log(arguments);
if(arguments.indexOf('-n')>-1){
    pos = arguments.indexOf('-n');
    name = arguments[pos+1];
    if(arguments.indexOf('-l')>-1){
        //输出  该人的每一条
        for(i in dataArr){
            if(dataArr[i][0]==name){
                console.log(Arr[i]);
            }
        }
    }else{
        //输出总和
        sum = 0;
        for(i in dataArr){
            if(dataArr[i][0]==name){
                sum+=parseInt(dataArr[i][3]);
            }
        }
        console.log(name.padEnd(9,' ')+sum.toString());
    }
}else if(arguments.indexOf('-l')>-1){
    for(i in dataArr){
        name = dataArr[i][0];
        sum = 0;
        for(j in dataArr){
            if(name == dataArr[j][0]){
                sum += parseInt(dataArr[j][3]);
                delete dataArr[j];
            }
        }
        console.log(name.padEnd(9,' ')+sum.toString());
    }
}
else if(arguments.indexOf('-a')>-1){
    var tempArr = dataArr.concat();
    var totalArr = new Array();
    for(i in tempArr){
        name = tempArr[i][0];
        sum = 0;
        for(j in tempArr){
            if(name == tempArr[j][0]){
                sum += parseInt(tempArr[j][3]);
                delete tempArr[j];
            }
        }
        totalArr.push([name,sum]);
    }
    console.log('赚钱最多的学生:    '+totalArr.sort(cmpAll)[totalArr.length-1][0]);
    console.log('赚钱最少的学生:    '+totalArr.sort(cmpAll)[0][0]);
    console.log('赚钱最多的日子:    '+dataArr.sort(cmp)[dataArr.length-1][1]);
    console.log('赚钱最少的日子:    '+dataArr.sort(cmp)[0][1]);
}
function cmp(x,y){
    return x[3]-y[3];
}
function cmpAll(x,y){
    return x[1]-y[1];
}