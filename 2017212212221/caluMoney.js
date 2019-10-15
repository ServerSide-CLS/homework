var name,p1,p2;
var fs=require('fs');
var data=fs.readFileSync('study.txt');
var argument=process.argv.splice(2);

Array.prototype.notempty = function() {
    var arr = [];
    this.map(function(val, index) {
        if (val !== "" && val != undefined) {
            arr.push(val);
        }
    });
    return arr;
}

for(var i=0;i<argument.length;i++){
    if(argument[i]=='-n')name=argument[i+1];
    else if(argument[i]=='-l')p1=1;
    else if(argument[i]=='-a')p2=1;
}
if(p2!=undefined){
    if(p1!=undefined ||name!=undefined)console.log("you can't input the argument -a ,when you inputing the argument -n or -l.");
    else{
        var dict_name={};
        var dict_date={};
        var index=0,line;
        var dataa=data.toString();
        while(index>-1){
            index=dataa.indexOf('\n');
            line=dataa.substring(0,index);
            dataa=dataa.substring(index+1);
            var linelist=line.split(' ');
            linelist=linelist.notempty();
            if(linelist[0] in dict_name) dict_name[linelist[0]]+=parseInt(linelist[3]);
            else dict_name[linelist[0]]=parseInt(linelist[3]);
            if(linelist[1] in dict_date) dict_date[linelist[1]]+=parseInt(linelist[3]);
            else dict_date[linelist[1]]=parseInt(linelist[3]);
        }
        delete dict_date['undefined'];
        delete dict_name['undefined'];
        var items_name= Object.keys(dict_name).map(function(key) {
            return [key, dict_name[key]];
        });
        items_name.sort(function(first, second) {
            return second[1] - first[1];
        });
        var items_date= Object.keys(dict_date).map(function(key) {
            return [key, dict_date[key]];
        });
        items_date.sort(function(first, second) {
            return second[1] - first[1];
        });
        console.log("赚钱最多的学生:    "+items_name[0][0]);
        console.log("赚钱最少的学生:    "+items_name[items_name.length-1][0]);
        console.log("赚钱最多的日子:    "+items_date[0][0]);
        console.log("赚钱最少的日子:    "+items_date[items_date.length-1][0]);
    }
}else{
    if(p1==1 && name!=undefined){
        var index=0,line;
        var dataa=data.toString();
        while(index>-1){
            index=dataa.indexOf('\n');
            line=dataa.substring(0,index);
            dataa=dataa.substring(index+1);
            var linelist=line.split(' ');
            linelist=linelist.notempty();
            if(linelist[0]===name ){
                console.log(line.toString());
            }
        }
    }else if(name!=undefined){
        var index=0,line,sumMoney=0;
        var dataa=data.toString();
        while(index>-1){
            index=dataa.indexOf('\n');
            line=dataa.substring(0,index);
            dataa=dataa.substring(index+1);
            var linelist=line.split(' ');
            linelist=linelist.notempty();
            if(linelist[0]==name){
                sumMoney+=parseInt(linelist[3]);
            }
        }
        console.log(sumMoney);
    }else if(p1==1){
        var dict={};
        var index=0,line;
        var dataa=data.toString();
        while(index>-1){
            index=dataa.indexOf('\n');
            line=dataa.substring(0,index);
            dataa=dataa.substring(index+1);
            var linelist=line.split(' ');
            linelist=linelist.notempty();
            if(linelist[0] in dict) dict[linelist[0]]+=parseInt(linelist[3]);
            else dict[linelist[0]]=parseInt(linelist[3]);
        }
        delete dict['undefined']
        for(var i in dict)console.log(i+"\t"+dict[i]);
    }else{
        console.log("please input arguments -a , -n , -l");
    }
}
