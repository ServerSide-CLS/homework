function getMapdate(strdata){//获取日期：钱和人:钱的Map对象
    let splitdata=strdata.split("\r\n");
    let mapdate=new Map();
    let mappeople=new Map();
    splitdata.forEach(element => {
        element=element.trim();
        let strarray=element.split(/\s+/);
        let cnt=0;
        if(!mapdate.has(strarray[1])){
            mapdate.set(strarray[1],parseInt(strarray[3]));
        }
        else{
            mapdate.set(strarray[1],parseInt(strarray[3])+mapdate.get(strarray[1]));
        }
        if(!mappeople.has(strarray[0])){
            mappeople.set(strarray[0],parseInt(strarray[3]));
        }
        else {
            mappeople.set(strarray[0],parseInt(strarray[3])+mappeople.get(strarray[0]));
        }
    });
    return [mapdate,mappeople,splitdata];
}
function getMaxMin(data){//取得最大值和最小值的KEY
    let minn=-1;
    let maxx=-1;
    let mindata,maxdata;
    for(let[key,val] of data.entries()) {
        if(minn==-1||val<minn){
            minn=val;
            mindata=key;
        }
        if(maxx==-1||val>maxx){
            maxx=val;
            maxdata=key;
        }
    }
    return [maxdata,mindata];
}
function getStatistics(date,people){//-a
    let [maxpeople,minpeople]=getMaxMin(people);
    let [maxdate,mindate]=getMaxMin(date);
    console.log("赚钱最多的学生:",maxpeople);
    console.log("赚钱最少的学生:",minpeople);
    console.log("赚钱最多的日子:",maxdate);
    console.log("赚钱最少的日子:",mindate);
}
function getPeople(data){//-l
    for(let[key,val] of data.entries()) {
        console.log(`${key}: ${val}`);
    }
}
function getPeopleline(data,strname){//-n
    data.forEach(v=>{
        v=v.trim();
        if(v.startsWith(`${strname} `)){
            console.log(v);
        }
    })
}
function solve(posa,posn,posl,name){
    var fs = require("fs");
    var data = '';
    var readerStream = fs.createReadStream('study.txt');
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function(chunk) {
        data += chunk;
    });
    readerStream.on('end',function(){
        let [date,people,dataline]=getMapdate(data);
        try{
            if(posa){
                getStatistics(date,people);
            }
            else if(posn&&posl){
                getPeopleline(dataline,name);
            }
            else if(posn){
                console.log(name,": ",people.get(name));
            }
            else if(posl){
                getPeople(people);
            }
            else{
                throw 'error';
            }
        }catch(e){
            console.log("输入参数有误");
            return ;
        }
    });
    readerStream.on('error', function(err){
        console.log(err.stack);
    });
}
function main(){
    var arguments = process.argv.splice(2);
    var posa=0;
    var posn=0;
    var posl=0;
    var name='';
    try{
        for(var i=0;i<arguments.length;i++){
            if(arguments[i]=="-n"){
                posn=1;
                name=arguments[i+1];
                i++;
            }
            else if(arguments[i]=="-l"){
                posl=1;
            }
            else if(arguments[i]=="-a"){
                posa=1;
            }
            else {
                throw 'error';
            }
        }
    }catch(e){
        console.log("输入参数有误");
        return ;
    }
    solve(posa,posn,posl,name);
}
main();
