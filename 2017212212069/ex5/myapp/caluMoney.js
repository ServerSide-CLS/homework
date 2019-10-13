var fs = require('fs');

var data = fs.readFileSync('study.txt');
// console.log("同步读取: " + data.toString());

var arguments = process.argv.splice(2);
var dataArray = data.toString().trim().split('\n');

switch(arguments[0]){
    case '-n':
        var name = arguments[1];
        if (arguments.length > 2){
            if (arguments[2] == '-l'){
                for (let index in dataArray){
                    var tmpData = dataArray[index].trim().split(/\s+/);
                    // console.log(tmpData);
                    if (tmpData[0].toString() == name){
                        console.log(dataArray[index]);
                    }
                }
            }
        }
        else if (arguments.length == 2){
            var sum = 0;
            for (let index in dataArray){
                var tmpData = dataArray[index].trim().split(/\s+/);
                // console.log(tmpData);
                if (tmpData[0].toString() == name){
                    // console.log(tmpData[3]);
                    sum += parseInt(tmpData[3]);
                }
            }
            console.log(sum);
        }else{
            console.log('请输入学生名称');
        }
        break;
    case '-l':
        var dataMap = new Map();
        for (let index in dataArray){
            var tmpData = dataArray[index].trim().split(/\s+/);
            if (dataMap.has(tmpData[0])){
                dataMap[tmpData[0]] += parseInt(tmpData[3]);
            }else{
                dataMap[tmpData[0]] = parseInt(tmpData[3]);
            }
        }
        for (let index in dataMap){
            console.log(index + ' ' + dataMap[index]);
        }
        break;
    case '-a':
            var personMap = new Map();
            for (let index in dataArray){
                var tmpData = dataArray[index].trim().split(/\s+/);
                if (personMap.has(tmpData[0])){
                    personMap.set(tmpData[0],personMap.get(tmpData[0]) + parseInt(tmpData[3]));
                }else{
                    personMap.set(tmpData[0],parseInt(tmpData[3]));
                }
            }
            // console.log(personMap);
            arrayObj=Array.from(personMap);
            arrayObj.sort(function(a,b){return b[1]-a[1]});

            console.log('赚钱最多的学生:    ' + arrayObj[0][0]);
            console.log('赚钱最少的学生:    ' + arrayObj[arrayObj.length - 1][0]);

            var dateMap = new Map();
            for (let index in dataArray){
                var tmpData = dataArray[index].trim().split(/\s+/);
                if (dateMap.has(tmpData[1])){
                    dateMap.set(tmpData[1],dateMap.get(tmpData[1]) + parseInt(tmpData[3]));
                }else{
                    dateMap.set(tmpData[1],parseInt(tmpData[3]));
                }
            }
            arrayObj=Array.from(dateMap);
            arrayObj.sort(function(a,b){return b[1]-a[1]});

            console.log('赚钱最多的日子:    ' + arrayObj[0][0]);
            console.log('赚钱最少的日子:    ' + arrayObj[arrayObj.length - 1][0]);
        break;
    default:

        break;
}		
