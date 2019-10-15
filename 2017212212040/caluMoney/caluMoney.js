var fs = require('fs');
var studydata=fs.readFileSync('study.txt','utf-8');
var data = {};
var result = [];
var date = {};
var dateresult = [];
var arguments = process.argv.splice(2);
var length = arguments.length;
lines = studydata.split('\n');

//Help users enter prompts
function usage() {
  console.log('-n 参数表示学生名称.');
  console.log('-l 参数表示输出列表.');
  console.log('-n参数和-l参数可以一起使用，表示查询学生的列表.');
  console.log('-a参数表示统计结果，比如 caluMoney -a输出, a参数不能和上面参数混用.');
  
}

//Defining a function to remove null values from an array
Array.prototype.bouncer = function () {
  return this.filter(item => {
    return item;
  });
}

//Branch reading
for (var i = 0;i < lines.length;i++) {
  var line = lines[i];
  if(!line) {
    continue;
  }
  name_score = line.split(' ');
//Take out the null value in the array
  name_score = name_score.bouncer();
//Count everyone’s total income
  if (data[name_score[0]]) {
    data[name_score[0]] += parseFloat(name_score[3])
  }
  else{
    data[name_score[0]] = parseFloat(name_score[3])
  }
}
//Sort
for (var key in data) result.push([key, data[key]]);
result.sort(function(a, b) {
  a = a[1];
  b = b[1];
//Small to large sort
  return a < b ? -1 : (a > b ? 1 : 0); 
});

//Daily income
for (var i = 0;i < lines.length;i++){
  line = lines[i];
  if(!line) {
    continue;
  }
  date_score = line.split(' ');
  date_score = date_score.bouncer();
	
  if (date[date_score[1]]) {
    date[date_score[1]] += parseFloat(date_score[3])
  }
  else{
    date[date_score[1]] = parseFloat(date_score[3])
  }
}
// small to large sort
for (var key in date) dateresult.push([key, date[key]]);
dateresult.sort(function(a, b) {
  a = a[1];
  b = b[1];
  return a < b ? -1 : (a > b ? 1 : 0); 
});

//After the data is processed, the parameters entered by the user are obtained
//Judging by the number of parameters
if(length === 0) {
  console.log("请输入参数！");
}
else if(length === 1) {
  if(arguments[0] === '-l') {
    for(var x =0;x<result.length;x++) {
      console.log(result[x][0]+':  '+result[x][1]);
    }
  }
  else if(arguments[0] === '-a') {
    console.log('赚钱最多的学生:   '+ result[result.length-1][0])
    console.log('赚钱最少的学生:   '+ result[0][0]);
    console.log('赚钱最多的日子:   '+ dateresult[dateresult.length-1][0])
    console.log('赚钱最少的日子:   '+ dateresult[0][0]);
  }
  else {
    usage();
  }
}
else if(length === 2) {
  if(arguments[0] === '-a') {
    usage();
  }
  if(arguments[0] === '-n') {
    if(data[arguments[1]]) {
      console.log(arguments[1]+'   '+data[arguments[1]]);
    }
    else {
      console.log("该人物不存在，请确认后再输入！");
    }
  }
}
else if(length === 3) {
  if(arguments[0] !== '-n' || arguments[2] !== '-l') {
    usage();
  }
  else{
    if(data[arguments[1]]){
      for (var i = 0;i < lines.length;i++) {
        var line = lines[i];
        if(line.startsWith(arguments[1])) {
          console.log(line);
        }
      }
    }
    else {
      console.log("该人物不存在，请确认后再输入！");
    }
  }
}
//Error when the parameter is greater than three
else {
  usage();
}




