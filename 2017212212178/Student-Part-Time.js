var fs = require('fs');
//原始文本
var array_end = [];
//存入二维数组的文本
var array_start = [];
//排序后的姓名和总金额
var array_startAnd = [];
//排序后的日期和总净额
var array_date = [];

// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
fs.readFile('student.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   //从txt中获取的文本，按照换行符划分成数组
   var array = data.toString().split('\r\n');
   for(i = 0;i < array.length;i++){
       //存入array_end数组形成二位数组
       array_end[i] = array[i].split();
       //去除字符间的空格
       array_end[i] = array_end[i][0].replace(/\s+/g, ' ').split(' ');
   }

   // 数据处理传入数组（array_startAnd)
   for(i = 0;i < array_end.length;i++){
    if(array_start.indexOf(array_end[i][0]) == -1){
         array_start.push(array_end[i][0],array_end[i][3]);
    }else{
     for(j = 0;j < array_start.length;j++){
         if(array_start[j] == array_end[i][0]){
             array_start[j+1] = parseInt(array_start[j+1]) + parseInt(array_end[i][3])
         }
     }
    }
    }
    for(j = 0;j < array_start.length;j=j+2){
    array_startAnd.push([array_start[j],array_start[j+1]])
    }

    for(i = 0;i < array_startAnd.length;i++){
    for(j = i + 1;j < array_startAnd.length;j++){
        if(array_startAnd[i][1]>array_startAnd[j][1]){
        k=array_startAnd[j][1];
        array_startAnd[j][1] = array_startAnd[i][1];
        array_startAnd[i][1] = k;
    }
    }
    }

    // 数据处理传入数组（array_date)
    array_start=[];
    for(i = 0;i < array_end.length;i++){
        if(array_start.indexOf(array_end[i][1]) == -1){
             array_start.push(array_end[i][1],array_end[i][3]);
        }else{
         for(j = 0;j < array_start.length;j++){
             if(array_start[j] == array_end[i][1]){
                 array_start[j+1] = parseInt(array_start[j+1]) + parseInt(array_end[i][3])
             }
         }
        }
        }
        for(j = 0;j < array_start.length;j=j+2){
            array_date.push([array_start[j],array_start[j+1]])
        }
    
        for(i = 0;i < array_date.length;i++){
        for(j = i + 1;j < array_date.length;j++){
            if(array_date[i][1]>array_date[j][1]){
            k=array_date[j][1];
            array_date[j][1] = array_date[i][1];
            array_date[i][1] = k;
        }
        }
        }

   //获取传入参数
   var arguments = process.argv.splice(2);
//  console.log('所传递的参数是：', arguments);

   if(arguments[1] == '-n'){
      if(!arguments[3]){
        total=0;
        for(i = 0;i < array_end.length;i++){
            if(arguments[2] == array_end[i][0]){
                total += parseInt(array_end[i][3]);
            }
        }
        console.log(total); 
      }else{
        for(i = 0;i < array_end.length;i++){
            if(arguments[2] == array_end[i][0]){
                console.log(array_end[i][0].padEnd(10,' ')+array_end[i][1].padEnd(20,' ')+
                array_end[i][2].padEnd(10,' ')+array_end[i][3].padEnd(10,' '))
            }
        }
      }
      
   }else if(arguments[1] == '-l'){
    for(i = 0;i < array_startAnd.length;i++){
        console.log(array_startAnd[i][0].padEnd(10,' ')+String(array_startAnd[i][1]).padEnd(10,' '));
    }
   }else if(arguments[1] == '-a'){
        console.log('赚钱最多的学生：      ' + array_startAnd[array_startAnd.length-1][0]);
        console.log('赚钱最少的学生：      ' + array_startAnd[0][0]);
        console.log('赚钱最多的学生：      ' + array_date[array_date.length-1][0]);
        console.log('赚钱最少的学生：      ' + array_date[0][0]);
   }else{
       console.log('Please input:')
       //统计结果
       console.log('caluMoney -a')
       //输出全部学生赚的全部钱列表
       console.log('caluMoney -l')
       //输出某位同学所赚钱的全部列表
       console.log('caluMoney -n wang -l')
       //输出某位同学所赚的全部钱
       console.log('caluMoney -n name(example:wang)')
   }
});