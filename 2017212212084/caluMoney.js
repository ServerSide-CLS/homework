var fs = require("fs");
var data = fs.readFileSync('study.txt');
var lines = data.toString().split('\n');
var arguments = process.argv.splice(2);
var dataArr=new Array();
var time = {}
var job = {}
var salary = {}
var person = {}


if((arguments[0]=='-n' && arguments[2]=='-l')){
    var name = arguments[1];
    dataArr.forEach(item => {
        if((item.name==name)){
        	console.log(item.toString().replace(/,/g,'\t'));
        }
    })
}

dataArr.forEach(item => {
    person[item.name]=0;
    time[item.time]=0;
})
dataArr.forEach(item => {
    person[item.name]+= parseInt(item.salary);
    time[item.time]+=parseInt(item.salary);
})

if((arguments[0]=='-n')){
    var name = arguments[1];
    sum = 0;
    dataArr.forEach(item => {
        if((item.name==name)){
            sum = parseInt(sum) + parseInt(item.salary);
        }
    })
    console.log(name+"  "+sum);
}

else if((arguments[0] == '-l')){
    for (var key in person){
        console.log(key + ' : ' + person[key]);
    }
}

else if((arguments[0] == '-a')){
	var maxDate;
    var maxStudent;
    var maxSalary=0;
    var minDate；
    var minstudent;
    var minSalary=1000;

    for (var key in person){
        if((person[key]>maxSalary)){
            maxSalary=person[key];
            maxStudent=key;
        }

        if((person[key]<minSalary)){
            minSalary=person[key];
            minstudent=key;
        }

    }
    maxSalary=0;
    minSalary=1000;
    for (var key in time){
        if((time[key]>maxSalary)){
            maxDate=key;
            maxSalary=time[key];
        }
        if((time[key]<minSalary)){
            minDate=key;
            minSalary=time[key];
        }
    }
    console.log("赚钱最多的学生:   ",maxStudent);
    console.log("赚钱最少的学生:   ",minstudent);
    console.log("赚钱最多的日子:   ",maxDate);
    console.log("赚钱最少的日子:   ",minDate);
}