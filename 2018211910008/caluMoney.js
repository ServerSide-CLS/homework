var fs = require('fs');
// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
var res = new Map();
var totalHistory = [];

fs.readFile('study.txt', function (err, data) {
    var arguments = process.argv.splice(2);
    if (err) {
        return console.error(err);
    }
    var pos = data.toString().split("\n");
    for(var i = 0;i<pos.length-1;i++){
        var pot = pos[i].split(/\s+/);
        var name = pot[0];
        var money = pot[3];
        var had = res.get(name);
        if(!had){
            had = 0;
        }
        
        res.set(name,Number(money)+had);
         
        totalHistory.push(pot);
    }
    if(arguments.length==1){
        if(arguments[0]=="-l"){
            for(var [name,money] of res.entries()){
                console.log(name+":  "+money)
            }
        }else if(arguments[0]=="-a"){
            var max = 0;
            var min = 0;
            var countMin = 0;
            var countMax = 0;
            var count = 0
            totalHistory.forEach(item =>{
                var ans = Number(item[3]);
                if(ans>min && ans>max){
                    max = ans;
                    countMax = count;
                }else if(ans>min && ans<max){
                    if(min==0){
                        min = ans;
                        countMin = count;
                    }
                }else if(ans<min){
                    min = ans;
                    countMin = count;
                }
                count++;
            });
            var minStu = totalHistory[countMin][0];
            var maxStu = totalHistory[countMax][0];
            var minDate = totalHistory[countMin][1];
            var maxDate = totalHistory[countMax][1];
            console.log("赚钱最多的学生:"+ "     " + `${maxStu}`);
            console.log("赚钱最少的学生:"+"     "+`${minStu}`);
            console.log("赚钱最多的日子:"+"     "+`${maxDate}`);
            console.log("赚钱最少的日子:"+"     "+`${minDate}`);

        }
    }
    if(arguments.length==3){
        try{
            let name = arguments[1];
            for(var i = 0;i<totalHistory.length;i++){
                if(totalHistory[i][0]==name){
                    console.log(totalHistory[i].join("  "));
                }
            }
        }catch(e){
            console.log(e);
        }
    }
    
    if(arguments.length==2){
        var name = arguments[1];
        console.log(res.get(name));
    }

 });
