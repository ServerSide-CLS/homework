
var fs = require('fs');

//原始文本
var array = [];

//原始二维数据(name，Date,job,number)
var inform = [];

fs.readFile('student.txt', function (err, data) {
  //异常处理
   if (err) {
       return console.error(err);
   }
   //获取文本数据并分割
   array = data.toString().split('\r\n');

   for(i = 0;i < array.length;i++){

      //分割数据
       inform[i] = array[i].split();

       //去除字符间的空格
       inform[i] = inform[i][0].replace(/\s+/g, ' ').split(' ');
   }

   // 数据处理传入数组（stu)
   let stu=[];
   //存入二维数组的文本
   let map = {};

    for(i = 0;i < inform.length;i++){
      if(!!map[inform[i][0]]){
          map[inform[i][0]]+=parseInt(inform[i][3]);
         
      }else{
          map[inform[i][0]]=parseInt(inform[i][3]);
      }
    }
    
    stu = Object.keys(map).map(function(key) {
      return [key,map[key]];
    });
    stu.sort(cmp= (x, y)=>( -y[1] + x[1]))

    // 数据处理传入数组（date)
    let date=[];

    //清空数组
    map={};

    for(i = 0;i < inform.length;i++){
      if(!!map[inform[i][1]]){
          map[inform[i][1]]+=parseInt(inform[i][3]);
         
      }else{
          map[inform[i][1]]=parseInt(inform[i][3]);
      }
    }
    
    date = Object.keys(map).map(function(key) {
      return [key,map[key]];
    });
    date.sort(cmp= (x, y)=>( -y[1] + x[1]));

    //--------------------------------------------------------------------------------
   //获取传入参数
   var arguments = process.argv.splice(2);

   //查询学生的全部钱
   if(arguments[1] == '-l')//列表形式显示所有同学所有sum
   {

      for(i = 0;i < stu.length;i++)
      {
        console.log(stu[i][0]+"          "+String(stu[i][1])+"          ");
      }
   }
   else if(arguments[1] == '-n'){
      if(!arguments[3]){

        //单行输出
        sum=0;
        for(i = 0;i < inform.length;i++){

          //匹配到姓名
            if(arguments[2] == stu[i][0])
            {
                return console.log(stu[i][1]); 
            }
        }
      }
      else
      {
        //列表形式输出
        for(i = 0;i < inform.length;i++){
            if(arguments[2] == inform[i][0]){
                console.log(inform[i][0]+"          "+inform[i][1]+"          "+inform[i][2]+"          "+inform[i][3]+"          ");
            }
        }
      }

   }
   
   else if(arguments[1] == '-a')
   {
        console.log('赚钱最多的学生：      ' + stu[stu.length-1][0]);
        console.log('赚钱最少的学生：      ' + stu[0][0]);
        console.log('赚钱最多的日子：      ' + date[date.length-1][0]);
        console.log('赚钱最少的日子：      ' + date[0][0]);
   }else{
      //输出参数信息
       console.log('Please input:\ncaluMoney -a\ncaluMoney -l\ncaluMoney -n wang -l\ncaluMoney -n name(example:wang)');
   }
});