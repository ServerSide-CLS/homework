var fs = require('fs');
var study_data=fs.readFileSync('study.txt','utf-8');
var data = {};
var date = {};
var result = [];
var data_result = [];
var arguments = process.argv.splice(2);
var length = arguments.length;
lines = study_data.split('\n');
//去空值函数
Array.prototype.bouncer = function () {
  return this.filter(item => {
    return item;
  });
}
//文本转换数组
for (var i = 0;i < lines.length;i++) {
  var line = lines[i];
  if(!line) {
    continue;
  }
  money = line.split(' ');
  money = money.bouncer();
//计算每个人的总收入
  if (data[money[0]]) {
    data[money[0]] += parseFloat(money[3])
  }
  else{
    data[money[0]] = parseFloat(money[3])
  }
}
//个人总收入排序
for (var k in data) result.push([k, data[k]]);
result.sort(function(a, b) {
  a = a[1];
  b = b[1];
  return a < b ? -1 : (a > b ? 1 : 0);
});

//每日收入
for (var i = 0;i < lines.length;i++){
  line = lines[i];
  if(!line) {
    continue;
  }
  daily_income = line.split(' ');
  daily_income = daily_income.bouncer();
   
  if (date[daily_income[1]]) {
    date[daily_income[1]] += parseInt(daily_income[3])
  }
  else{
    date[daily_income[1]] = parseInt(daily_income[3])
  }
}
for (var k in date) data_result.push([k, date[k]]);
data_result.sort(function(a, b) {
  a = a[1];
  b = b[1];
  return a < b ? -1 : (a > b ? 1 : 0);
});

//主函数
if(length == 0) {
  console.log('请输入参数');
}
else if(length == 1) {
  if(arguments[0] == '-l') {
    for(var x =0;x<result.length;x++) {
      console.log(result[x][0]+':  '+result[x][1]);
    }
  }
  else if(arguments[0] == '-a') {
    console.log('赚钱最多的学生:   '+ result[result.length-1][0])
    console.log('赚钱最少的学生:   '+ result[0][0]);
    console.log('赚钱最多的日子:   '+ data_result[data_result.length-1][0])
    console.log('赚钱最少的日子:   '+ data_result[0][0]);
  }
  else {
    console.log('failed');
  }
}
else if(length == 2) {
  if(arguments[0] == '-a') {
    console.log('failed');
  }
  if(arguments[0] == '-n') {
    if(data[arguments[1]]) {
      console.log(arguments[1]+'   '+data[arguments[1]]);
    }
    else {
      console.log('failed');
    }
  }
}
else if(length == 3) {
  if(arguments[0] !== '-n' || arguments[2] !== '-l') {
    console.log('failed');
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
      console.log('failed');
    }
  }
}
else {
  console.log('failed');
}


