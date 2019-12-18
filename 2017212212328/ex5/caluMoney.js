var rf=require("fs");
var data=rf.readFileSync("./study.txt","utf-8");
lines = data.split('\r\n');
dict = {}
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line){
        continue;
    }
    name_score = line.split(' ');
    if (dict[name_score[0]]) {
        dict[name_score[0]] += parseFloat(name_score[3])
    }
    else{
        dict[name_score[0]] = parseFloat(name_score[3])
    }
}

 
var result = [];
for (var key in dict) 
	result.push([key, dict[key]]);
result.sort(function(a, b) {
    a = a[1];
    b = b[1];
    return a < b ? -1 : (a > b ? 1 : 0); // 小到大排
    //return a > b ? -1 : (a < b ? 1 : 0); // 大到小排
});
 


dict2 = {}
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line){
        continue;
    }
    name_score = line.split(' ');
    if (dict2[name_score[1]]) {
        dict2[name_score[1]] += parseFloat(name_score[3])
    }
    else{
        dict2[name_score[1]] = parseFloat(name_score[3])
    }
}

 
var result2 = [];
for (var key in dict2) 
    result2.push([key, dict2[key]]);
result2.sort(function(a, b) {
    a = a[1];
    b = b[1];
    return a < b ? -1 : (a > b ? 1 : 0); // 小到大排
    //return a > b ? -1 : (a < b ? 1 : 0); // 大到小排
});


var arguments = process.argv.splice(2);
if(arguments.length==1){
    if(arguments[0]=='-l'){
        for(var key in result){
            console.log(result[key][0]+" "+result[key][1])
        }
    }
    else if(arguments[0]=='-a'){
        var afinal = [];
        afinal.push("赚钱最多的学生:"+result[result.length-1][0])
        afinal.push("赚钱最少的学生:"+result[0][0])
        afinal.push("赚钱最多的日子:"+result2[result2.length-1][0])
        afinal.push("赚钱最少的日子:"+result2[0][0])
        //console.log(afinal)
        for(var i in afinal){
            console.log(afinal[i])
        }
    }
    //console.log(result2)
}
else if(arguments.length==2){
    for(var key in result){
        if(arguments[1]==result[key][0])
            console.log(result[key][1])
    }
}
else if(arguments.length==3){
    var someone = [];
    for(var i in lines){
        name_score = lines[i].split(' ');
        if(name_score[0]==arguments[1])
            someone.push(lines[i])
    }
    for(var i in someone){
        console.log(someone[i])
    }
}