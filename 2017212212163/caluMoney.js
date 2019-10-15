var fs = require("fs");

var arguments = require('minimist')(process.argv.splice(2) ,{
    string: ["n"]    //修改-n参数的值默认true被解析为字符串
});
console.log('传递参数:',arguments);

if(arguments.a)   //-a
{
    if(arguments.l || arguments.n != null)
        console.log("error,a参数不能和其他参数混用");
    else {
        count();
    }
}
/*
//异步回调
function callback(array) {
    console.log(arguments.n);
    array.forEach((item)=>{
        
        if(item.split(" ")[0]==arguments.n)
            console.log(item);
    });
}

function result(callback) {
    //异步读取
    fs.readFile('study.txt', function(err, data) {
        if(err) {
            return console.error(err);
        }
        
        var str = data.toString();
        //console.log(str);
        var strArray = str.split("\r\n");
        callback(strArray);
    });
}
*/

if(arguments.n=='')
    console.log("请在-n后输入人名");
else if(arguments.n != null){     //-n ? or  -l -n ?
    // 同步读取
    var data = fs.readFileSync('study.txt');
    var str = data.toString();
    var strArray = str.split("\r\n");
    strArray.forEach((item)=>{
        
        if(item.split(" ")[0]==arguments.n)
            console.log(item);
    });
}
else {
    if(arguments.l){    //-l
        //异步读取
        fs.readFile('study.txt', function(err, data) {
            if(err) {
                return console.error(err);
            }
            var str = data.toString();
            //console.log(str);
            var strArray = str.split("\r\n");
            var list = strArray.map((item)=>{
                //console.log(item.split(" "));
                var newItem = [];
                newItem.push(item.split(" ")[0] + " " + item.split(" ")[item.split(" ").length - 1]);
                return newItem.toString();
            });
            list.forEach((item)=>{console.log(item)});    
        });
    }
}

  
var bubbleSort=function(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i][3]<arr[j][3]){//如果前面的数据比后面的大就交换,降序
				var temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	} 
	return arr;
}
function count(){
    //异步读取
    fs.readFile('study.txt', function(err, data) {
        if(err) {
            return console.error(err);
        }
        var str = data.toString();
        //console.log(str);
        var strArray = str.split("\r\n");
        /*
        var list = strArray.map((item)=>{
            //console.log(item.split(" "));
            var newItem = [];
            newItem.push(item.split(" ")[0], item.split(" ")[item.split(" ").length - 1]);
            return newItem;
        });
        */
        var list = strArray.map((item)=>{
            //console.log(item.split(" "));
            var newItem = [];
            for(var i=0;i<item.split(" ").length;i++){
                if(item.split(" ")[i]!=""){
                    newItem.push(item.split(" ")[i]);
                }
            }
            return newItem;
        });
        var listSort = bubbleSort(list);

        var array=[];
        var n=0;

        list.map((item)=>{
            var flag = true;
            for(i=0; i< n; i++){
                if(item[0]==array[i][0]){
                    
                    array[i][3] = parseInt(array[i][3]) +  parseInt(item[3]); 
                    flag = false; 
                }

            }
            //console.log(array);
            if(flag){
                array.push(item);
                n++;
            // console.log(array[0])
            }
            return item;
        });
        bubbleSort(array);
       //console.log(list)
        //console.log(array);
        console.log("赚钱最多的学生:",array[0][0]);
        console.log("赚钱最少的学生:",array[n-1][0]);
        console.log("赚钱最多的日子:",listSort[0][1]);
        console.log("赚钱最少的日子:",listSort[list.length-1][1]);

    });
}

 









