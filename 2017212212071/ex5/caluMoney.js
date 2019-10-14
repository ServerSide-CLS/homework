var fs = require('fs');

fs.readFile('study.txt', function (err, data) {
    var arguments = process.argv.splice(2);
    var res = [];
    var infos = new Map();

    var arr = data.toString().split("\n");

    for(var i = 0;i<arr.length;i++){
        var money = 0;
        var pos = arr[i].split(/\s+/);
        var name = pos[0];
        var date = pos[1];
        var job = pos[2];
        var gain = pos[3];
        res.push(pos);

        if (infos.get(name)){
            money = infos.get(name);
        }

        infos.set(name,parseInt(gain)+money);
    }

    if(arguments.length==1){
        if(arguments[0]=="-l"){
            infos.forEach(function(gain,name){
                console.log(name,gain);
            });
        }else if(arguments[0]=="-a"){
            var max = -1,min = 100000;
            var max_pos = 0,min_pos = 0;
            var count = 0;
            var max_stu = "";
            var min_stu = "";
            infos.forEach(function(gain,name){
                if (gain>=Math.max(gain,max)){
                    max = gain;
                    max_stu = name;
                }
                if (gain<=Math.min(gain,min)){
                    min = gain;
                    min_stu = name;
                }
            });
            max = -1;min = 100000;
            res.forEach(function (item) {
                var num = parseInt(item[3]);
                if (Math.max(num,max,min)!=max){
                    max = num;
                    max_pos = count;
                }
                if (Math.min(num,max,min)!=min){
                    min = num;
                    min_pos = count;
                }
                count++;
            });
            var max_date = res[max_pos][1];
            var min_date = res[min_pos][1];
            console.log("赚钱最多的学生: "+ max_stu);
            console.log("赚钱最少的学生: "+ min_stu);
            console.log("赚钱最多的日子: "+ max_date);
            console.log("赚钱最少的日子: "+ min_date);
        }
    }

    if(arguments.length==2){
        var name = arguments[1];
        console.log(infos.get(name));
    }

    if(arguments.length==3){
        var name = arguments[1];
        res.forEach(function (item) {
            if(item[0]==name){
                console.log(item.join(" "));
            }
        });
    }

});
