var fs = require('fs');

fs.readFile('study.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   var array = data.toString().split('\r\n');
   var array_tmp = [];
   for(i = 0; i < array.length; i++) {
      array_tmp[i] = array[i].split();
      array_tmp[i] = array_tmp[i][0].replace(/\s+/g,' ').split(' ');
    }
    var arr_name = [];
    var arr_date = [];
    var arr_job = [];
    var arr_accont = [];
    for(i = 0; i < array_tmp[0].length;i++) {   //将信息分别存放在四个数组中操作
      if((i + 1) % 4 == 1)
        arr_name.push(array_tmp[0][i]);
      else if((i + 1) % 4 == 2)
        arr_date.push(array_tmp[0][i]);
      else if((i + 1) % 4 == 3)
        arr_job.push(array_tmp[0][i]);
      else 
        arr_accont.push(array_tmp[0][i]);
    }
    var arguments = process.argv.splice(2); //获取命令行后面的参数
    var len_arguments = arguments.length;
    if(len_arguments > 3) {       //长度大于3肯定是错误的
      console.log("error");
    } else {
      if(arguments[0] == '-n' && len_arguments == 2) {    //-n操作
        var total_money = 0;
        for(i = 0; i < arr_name.length; i++) {
          if(arr_name[i] == arguments[1]) 
            total_money += parseInt(arr_accont[i]);     //累加和命令一样名字的金额
        }
        if(total_money != 0) 
          console.log(arguments[1],total_money);
        else                                          //累加金额为0，输出not found
          console.log("not found");
      } else if(arguments[0] == '-l' && len_arguments == 1) {
        var my_map = new Map();                     //这个map用来映射人名和顺序
        var new_name = [];
        var new_money = [];
        var id = 0;
        for(i = 0; i < arr_name.length; i++) {
          if(!my_map.has(arr_name[i])) {        //如果这个人名不再map中出现过，就把它放入map，并且用数组记录
            my_map.set(arr_name[i],id);
            id++;
            new_name.push(arr_name[i]);
            new_money.push(parseInt(arr_accont[i]));
          } else {
            var arr_id = my_map.get(arr_name[i]);         //这个人名已经出现过，那么就获取她的id值，从而直接对应到数组里面累加
            new_money[arr_id] += parseInt(arr_accont[i]);
          }
        }
        for(i = 0; i < new_name.length - 1; i++)          //输出人名 金额数组
          console.log(new_name[i].padEnd(9,' '),new_money[i]);
      } else if(arguments[0] == '-n' && arguments[2] == '-l') {
        var number_item = 0;      //记录中间的人名的信息出现过几次
        for(i = 0; i < arr_name.length; i++) {
          if(arguments[1] == arr_name[i]) {
            console.log(arr_name[i].padEnd(9,' '), arr_date[i].padEnd(9,' '), arr_job[i].padEnd(9,' '),arr_accont[i].padEnd(9,' '));
            number_item += 1;
          }
        }
        if(number_item == 0)      //没有出现过就输出not found
          console.log("not found");
      } else if(arguments[0] == '-a' && len_arguments == 1) {
        var my_map_people = new Map();//用两个map来对应最多金额人名和最多金额日期的数组之间的id转换
        var my_map_data = new Map();
        var new_name = [];
        var new_money_people = [];
        var new_date = [];
        var new_money_date = [];
        var id_people = 0;
        var id_date = 0;
        for(i = 0; i < arr_name.length; i++) {
          if(!my_map_people.has(arr_name[i])) {   //map中没有出现过人名
            my_map_people.set(arr_name[i],id_people);
            id_people++;
            new_name.push(arr_name[i]);
            new_money_people.push(parseInt(arr_accont[i]));
          } else {                //出现过人名
            var arr_id_people = my_map_people.get(arr_name[i]);
            new_money_people[arr_id_people] += parseInt(arr_accont[i]);
          }

          if(!my_map_data.has(arr_date[i])) {     //map中没有出现过日期
            my_map_data.set(arr_date[i],id_date);
            id_date++;
            new_date.push(arr_date[i]);
            new_money_date.push(parseInt(arr_accont[i]));
          } else {                //出现过日期
            var arr_id_date = my_map_data.get(arr_date[i]);
            new_money_date[arr_id_date] += parseInt(arr_accont[i]);
          }
        }
        var max_money_people;
        var min_money_people;
        var max_name;
        var min_name;
        for(i = 0; i < new_name.length - 1; i++) {    //遍历一次找到最多的人和最少的人
          if(i == 0) {
            max_name = min_name = new_name[i];
            max_money_people = min_money_people = parseInt(new_money_people[i]);
          } else {
            if(parseInt(new_money_people[i]) > parseInt(max_money_people)) {
              max_money_people = parseInt(new_money_people[i]);
              max_name = new_name[i];
            }
            if(parseInt(new_money_people[i]) < parseInt(min_money_people)) {
              min_money_people = parseInt(new_money_people[i]);
              min_name = new_name[i];
            }
          }
        }
        var max_money_date;
        var min_money_date;
        var max_data;
        var min_date;
        for(i = 0; i < new_date.length - 1; i++) {    //遍历一次找到最多的日期和最少的日期
          if(i == 0) {
            min_date = max_date = new_date[i];
            max_money_date = min_money_date = parseInt(new_money_date[i]);
          } else {
            if(parseInt(new_money_date[i]) > parseInt(max_money_date)) {
              max_money_date = parseInt(new_money_date[i]);
              max_date = new_date[i];
            }
            if(parseInt(new_money_date[i]) < parseInt(min_money_date)) {
              min_money_date = parseInt(new_money_date[i]);
              min_date = new_date[i];
            }
          }
        }
        console.log("赚钱最多的学生：    ",max_name);
        console.log("赚钱最少的学生：    ",min_name);
        console.log("赚钱最多的日子：    ",max_date);
        console.log("赚钱最少的日子：    ",min_date);
      } else {        //其余非法操作输出error
        console.log("error");
      }
    }
});
                                                                                                        
