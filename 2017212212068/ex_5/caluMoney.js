var fs = require('fs');

fs.readFile('study.txt', function (err, data) {
    var i;
    var arguments = process.argv.splice(2);
    var information = [];
    var info = new Map();
    var moneyday = new Map();
    var arr = data.toString().split("\n");

    for(i = 0;i<arr.length;i++){

        var massage = arr[i].split(/\s+/);
        var name = massage[0];
        var date = massage[1];
        var job = massage[2];
        var money = massage[3];
        var value = money;
        information.push(massage);

        if (info.get(name)){
            money = parseInt(money)+parseInt(info.get(name));
        }

        info.set(name,money);
        if(moneyday.get(date)){
            value= parseInt(value) +parseInt(moneyday.get(date));
        }
        moneyday.set(date,value);
    }

    if(arguments.length==1){
        if(arguments[0]=="-l"){
            info.forEach(function(getmoney,name){
                console.log(name,getmoney);
            });
        }else if(arguments[0]=="-a"){
            var maxx = 0,minn = 1000000000;
            var count = 0;
            var max_stu = "";
            var min_stu = "";
            info.forEach(function(getmoney,name){
                if (getmoney>maxx){
                    maxx = getmoney;
                    max_stu = name;
                }
                if (getmoney<minn){
                    minn = getmoney;
                    min_stu = name;
                }
            });

            maxx = 0;minn = 1000000000;
            moneyday.forEach(function (getmoney,day) {
                if(getmoney>maxx){
                    maxx=getmoney;
                    max_date=day;
                }
                if(getmoney<minn){
                    minn=getmoney;
                    min_date=day;
                }
            })

            console.log("赚钱最多的学生: "+ max_stu);
            console.log("赚钱最少的学生: "+ min_stu);
            console.log("赚钱最多的日子: "+ max_date);
            console.log("赚钱最少的日子: "+ min_date);
        }
    }

    if(arguments.length==2){
        var name = arguments[1];
        console.log(info.get(name));
    }

    else if(arguments.length==3){
        var name = arguments[1];
        information.forEach(function (item) {
            if(item[0]==name){
                console.log(item.join(" "));
            }
        });
    }

});
