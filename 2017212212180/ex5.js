var fs = require('fs');
var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);// 所传递的参数是： [ '-n', 'wang', '-l' ]


//读取txt
/*fs.readFileSync('ex5.txt','utf8',(err,data)=>{
    if(err){
        return console.error(err);
    }
    else{
        console.log(data.toString());
    }
    
});
console.log('end');


var lines = data.toString().split('\n');
var data_array = new Array();
lines.forEach(element => {
    if((element=='')){
        return true;
    }
    temp = element.split(/\s+/);
    data_array.push({name:temp[0],time:temp[1],job:temp[2],pay:temp[3]});
});*/

//获取原始数据
var data = fs.readFileSync('ex5.txt');
var lines = data.toString().split('\n');
var data_array = new Array();
lines.forEach(element => {
    if((element=='')){
        return true;
    }
    temp = element.split(/\s+/);
    data_array.push({
        name:temp[0],
        time:temp[1],
        job:temp[2],
        pay:temp[3]}
        );
});
//console.log(data_array);
var student = {};
var time = {};
data_array.forEach(item => {
    student[item.name]=0;time[item.time]=0;
})
data_array.forEach(item => {
    student[item.name]+= parseInt(item.pay);time[item.time]+=parseInt(item.pay);
})


if((arguments[0]=='-n' && arguments[2]=='-l')){
    var name = arguments[1];
    data_array.forEach(item => {
        if((item.name==name)){
            console.log(
                (item.name.toString()),
                (item.time.toString()),
                (item.job.toString()),
                (item.pay.toString()));
        }
    })
}
else if((arguments[0]=='-n')){
    var name = arguments[1];
    sum = 0;
    data_array.forEach(item => {
        if((item.name==name)){
            sum = parseInt(sum) + parseInt(item.pay);
        }
    })
    console.log(name+"  "+sum);
}
else if((arguments[0]=='-l')){
    for (var key in student){
        console.log(key + ' : ' + student[key]);
    }
}

else if((arguments[0]=='-a')){
    var max_name;
    var min_name;
    var max_time;
    var min_time;
    var max_pay=0;
    var min_pay=200;
    for (var key in student){
        if((student[key]>max_pay)){
            max_pay=student[key];max_name=key;
        }
        if((student[key]<min_pay)){
            min_pay=student[key]; min_name=key;
        }
    }
    max_pay=0;
    min_pay=200;
    for (var key in time){
        if((time[key]>max_pay)){
            max_time=key;
            max_pay=time[key];
        }
        if((time[key]<min_pay)){
            min_time=key;
            min_pay=time[key];
        }
        
    }
    console.log("赚钱最多的学生: "+max_name)
    console.log("赚钱最少的学生: "+min_name)
    console.log("赚钱最多的日子: "+max_time)
    console.log("赚钱最少的日子: "+min_time)
}
else{
    console.log("bad arguments!");
}