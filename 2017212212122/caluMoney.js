var fs = require('fs');

var arguments = process.argv.splice(2);
//console.log('所传递的参数是：', arguments);
// 所传递的参数是： [ '-n', 'wang', '-l' ]

// 获取原始数据
var data = fs.readFileSync('study');
var lines = data.toString().split('\n');
var data_array = new Array();
lines.forEach(element => {
    if((element=='')){
        return true;
    }
    temp = element.split(/\s+/);
    data_array.push({name:temp[0],time:temp[1],job:temp[2],salary:temp[3]});
});
//console.log(data_array);


// 获取时间 学生的赚钱总数
var person = {};
var time = {};
data_array.forEach(item => {
    person[item.name]=0;
    time[item.time]=0;
})
data_array.forEach(item => {
    person[item.name]+= parseInt(item.salary);
    time[item.time]+=parseInt(item.salary);
})


// 处理参数
if((arguments[0]=='-n' && arguments[2]=='-l')){
    var name = arguments[1];
    data_array.forEach(item => {
        if((item.name==name)){
            console.log(
                (item.name.toString()),
                (item.time.toString()),
                (item.job.toString()),
                (item.salary.toString())
                );
        }
    })
}
else if((arguments[0]=='-n')){
    var name = arguments[1];
    sum = 0;
    data_array.forEach(item => {
        if((item.name==name)){
            sum = parseInt(sum) + parseInt(item.salary);
        }
    })
    console.log(name+"  "+sum);
}
else if((arguments[0]=='-l')){
    for (var key in person){
        console.log(key + ' : ' + person[key]);
    }
}
else if((arguments[0]=='-a')){
    var max_name;
    var max_salary=0;
    var min_name;
    var min_salary=9999;
    var max_time;
    var min_time
    for (var key in person){
        if((person[key]>max_salary)){
            max_salary=person[key];
            max_name=key;
        }
        if((person[key]<min_salary)){
            min_salary=person[key];
            min_name=key;
        }
    }
    max_salary=0;
    min_salary=9999;
    for (var key in time){
        if((time[key]>max_salary)){
            max_time=key;
            max_salary=time[key];
        }
        if((time[key]<min_salary)){
            min_time=key;
            min_salary=time[key];
        }
        
    }
    console.log(
    "赚钱最多的学生:   "+max_name+
    "\n赚钱最少的学生:   "+min_name+
    "\n赚钱最多的日子:   "+max_time+
    "\n赚钱最少的日子:   "+min_time)
}
else{
    console.log("bad arguments!");
}