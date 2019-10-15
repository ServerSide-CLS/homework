var fs = require('fs');

//nodejs获取命令行参数的方式 node index.js -n wang -l
var arguments = process.argv.splice(2);
//console.log('所传递的参数是：', arguments);
// 所传递的参数是： [ '-n', 'wang', '-l' ]

// 读取文本-同步读取
var data = fs.readFileSync('study.txt');
var lines = data.toString().split('\n');
var array = [];

//遍历数组元素.
lines.forEach(myfunction);
function myfunction(value){
    if (value == ''){
        return true;
    }
    temp = value.split(/\s+/);
    array.push({name:temp[0],time:temp[1],job:temp[2],salary:temp[3]});
    //向数组添加新元素
}

// 获取每个学生和每个时间分别对应的赚钱总数
var student = {};
var time = {};
var i = {};
var arraylen;
arraylen=array.length;

for (i=0; i < arraylen; i++){
    student[array[i].name]=0;
    time[array[i].time]=0;
}
for (i=0; i < arraylen; i++){
    student[array[i].name] += parseInt(array[i].salary);
    time[array[i].time] += parseInt(array[i].salary);
}

// -n参数和-l参数可以一起使用，比如caluMoney -n wang -l输出wang的列表
if((arguments[0]=='-n' && arguments[2]=='-l')){
    var name = arguments[1];
    for (var i in array){
        if (array[i].name==name){
            console.log(
                (array[i].name.toString()) + " " + (array[i].time.toString()) + " " +(array[i].job.toString()) + "  " +(array[i].salary.toString())
            );
        }
    }
}

//-n参数表示学生名称，比如 caluMoney -n wang输出wang的赚的全部钱 95
else if(arguments[0]=='-n'){
    var name = arguments[1];
    sum = 0;
    for (var i in array){
        if (array[i].name==name){
            sum = parseInt(sum) + parseInt(array[i].salary);
        }
    }
    console.log(name + "  " + sum);
}


//-l参数表示输出列表，比如 caluMoney -l输出全部学生赚的全部钱列表
else if(arguments[0]=='-l'){
    for (var i in student ){
        console.log(i + "  " + student[i]);
    }
}

//-a参数表示统计结果，比如 caluMoney -a输出, a参数不能和上面参数混用
else if(arguments[0]=='-a'){
    var max_name,min_name;
    var max_salary=0,min_salary=9999;
    var max_time,min_time;
    for (var j in student){
        if((student[j]>max_salary)){
            max_salary=student[j];
            max_name=j;
        }
        if((student[j]<min_salary)){
            min_salary=student[j];
            min_name=j;
        }
    
    }
    max_salary=0;
    min_salary=9999;
    for (var k in time){
        if((time[k]>max_salary)){
            max_time=k;
            max_salary=time[k];
        }
        if((time[k]<min_salary)){
            min_time=k;
            min_salary=time[k];
        }   
    }
    console.log(
    "赚钱最多的学生:   " + max_name + "\n赚钱最少的学生:   " + min_name+"\n赚钱最多的日子:   "+max_time + "\n赚钱最少的日子:   "+min_time)
}
else{
    console.log("Error arguments");
}




